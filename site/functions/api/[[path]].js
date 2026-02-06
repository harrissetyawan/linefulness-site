/**
 * Cloudflare Pages Function - API Routes
 * Handles all API requests for the Linefulness D1 database
 */

import { createDatabase } from '../../src/lib/db';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const startTime = Date.now();
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const db = createDatabase(env.DB);
    const path = url.pathname.replace('/api/', '');
    const segments = path.split('/').filter(Boolean);
    
    let response;
    
    // Route handling
    switch (segments[0]) {
      case 'health':
        response = await handleHealth(request, db);
        break;
      case 'niches':
        response = await handleNiches(request, db, segments.slice(1));
        break;
      case 'locations':
        response = await handleLocations(request, db, segments.slice(1), url);
        break;
      case 'templates':
        response = await handleTemplates(request, db, segments.slice(1));
        break;
      case 'config':
        response = await handleConfig(request, db, segments.slice(1));
        break;
      case 'navigation':
        response = await handleNavigation(request, db);
        break;
      default:
        response = jsonResponse({ error: 'Not Found' }, 404);
    }
    
    // Log API request
    const duration = Date.now() - startTime;
    await db.logApiRequest({
      endpoint: url.pathname,
      method: request.method,
      status_code: response.status,
      response_time_ms: duration,
      ip_address: request.headers.get('cf-connecting-ip') || undefined,
      user_agent: request.headers.get('user-agent') || undefined,
    }).catch(() => {}); // Ignore logging errors
    
    return response;
    
  } catch (error) {
    console.error('API Error:', error);
    return jsonResponse({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
}

/**
 * Health check endpoint
 */
async function handleHealth(request, db) {
  return jsonResponse({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: 'connected'
  });
}

/**
 * Niches CRUD operations
 */
async function handleNiches(request, db, segments) {
  const id = segments[0];
  
  switch (request.method) {
    case 'GET':
      if (id) {
        const niche = await db.getNicheBySlug(id) || await db.getNicheById(id);
        if (!niche) {
          return jsonResponse({ error: 'Niche not found' }, 404);
        }
        return jsonResponse(niche);
      } else {
        const niches = await db.getAllNiches();
        return jsonResponse(niches);
      }
      
    case 'POST':
      if (id) return jsonResponse({ error: 'Method not allowed' }, 405);
      const nicheData = await request.json();
      const newNiche = await db.createNiche({
        id: nicheData.id || generateId(),
        ...nicheData,
        is_active: nicheData.is_active ?? true,
        is_default: nicheData.is_default ?? false,
      });
      return jsonResponse(newNiche, 201);
      
    case 'PUT':
    case 'PATCH':
      if (!id) return jsonResponse({ error: 'ID required' }, 400);
      const updateData = await request.json();
      const updatedNiche = await db.updateNiche(id, updateData);
      if (!updatedNiche) {
        return jsonResponse({ error: 'Niche not found' }, 404);
      }
      return jsonResponse(updatedNiche);
      
    case 'DELETE':
      if (!id) return jsonResponse({ error: 'ID required' }, 400);
      const deleted = await db.deleteNiche(id);
      if (!deleted) {
        return jsonResponse({ error: 'Niche not found' }, 404);
      }
      return jsonResponse({ success: true }, 204);
      
    default:
      return jsonResponse({ error: 'Method not allowed' }, 405);
  }
}

/**
 * Locations CRUD operations
 */
async function handleLocations(request, db, segments, url) {
  const id = segments[0];
  const nicheId = url.searchParams.get('niche_id');
  
  switch (request.method) {
    case 'GET':
      if (id) {
        const location = await db.getLocationById(id) || await db.getLocationBySlug(id);
        if (!location) {
          return jsonResponse({ error: 'Location not found' }, 404);
        }
        return jsonResponse(location);
      } else if (nicheId) {
        const locations = await db.getLocationsByNiche(nicheId);
        return jsonResponse(locations);
      } else {
        const locations = await db.getAllLocations();
        return jsonResponse(locations);
      }
      
    case 'POST':
      if (id) return jsonResponse({ error: 'Method not allowed' }, 405);
      const locationData = await request.json();
      const newLocation = await db.createLocation({
        id: locationData.id || generateId(),
        ...locationData,
        is_active: locationData.is_active ?? true,
      });
      return jsonResponse(newLocation, 201);
      
    case 'PUT':
    case 'PATCH':
      if (!id) return jsonResponse({ error: 'ID required' }, 400);
      const updateData = await request.json();
      const updatedLocation = await db.updateLocation(id, updateData);
      if (!updatedLocation) {
        return jsonResponse({ error: 'Location not found' }, 404);
      }
      return jsonResponse(updatedLocation);
      
    case 'DELETE':
      if (!id) return jsonResponse({ error: 'ID required' }, 400);
      const deleted = await db.deleteLocation(id);
      if (!deleted) {
        return jsonResponse({ error: 'Location not found' }, 404);
      }
      return jsonResponse({ success: true }, 204);
      
    default:
      return jsonResponse({ error: 'Method not allowed' }, 405);
  }
}

/**
 * Templates CRUD operations
 */
async function handleTemplates(request, db, segments) {
  const id = segments[0];
  const url = new URL(request.url);
  const nicheId = url.searchParams.get('niche_id');
  
  switch (request.method) {
    case 'GET':
      if (id) {
        const template = await db.getTemplateById(id);
        if (!template) {
          return jsonResponse({ error: 'Template not found' }, 404);
        }
        return jsonResponse(template);
      } else if (nicheId) {
        const templates = await db.getTemplatesByNiche(nicheId);
        return jsonResponse(templates);
      } else {
        const templates = await db.getAllTemplates();
        return jsonResponse(templates);
      }
      
    case 'POST':
      if (id) return jsonResponse({ error: 'Method not allowed' }, 405);
      const templateData = await request.json();
      const newTemplate = await db.createTemplate({
        id: templateData.id || generateId(),
        ...templateData,
        is_active: templateData.is_active ?? true,
      });
      return jsonResponse(newTemplate, 201);
      
    case 'PUT':
    case 'PATCH':
      if (!id) return jsonResponse({ error: 'ID required' }, 400);
      const updateData = await request.json();
      const updatedTemplate = await db.updateTemplate(id, updateData);
      if (!updatedTemplate) {
        return jsonResponse({ error: 'Template not found' }, 404);
      }
      return jsonResponse(updatedTemplate);
      
    case 'DELETE':
      if (!id) return jsonResponse({ error: 'ID required' }, 400);
      const deleted = await db.deleteTemplate(id);
      if (!deleted) {
        return jsonResponse({ error: 'Template not found' }, 404);
      }
      return jsonResponse({ success: true }, 204);
      
    default:
      return jsonResponse({ error: 'Method not allowed' }, 405);
  }
}

/**
 * Configuration endpoints
 */
async function handleConfig(request, db, segments) {
  const type = segments[0];
  
  switch (type) {
    case 'site':
      if (request.method === 'GET') {
        const config = await db.getSiteConfig();
        if (!config) {
          return jsonResponse({ error: 'Site config not found' }, 404);
        }
        return jsonResponse(config);
      } else if (request.method === 'PUT' || request.method === 'PATCH') {
        const updates = await request.json();
        const updated = await db.updateSiteConfig(updates);
        return jsonResponse(updated);
      }
      break;
      
    case 'zazzle':
      if (request.method === 'GET') {
        const config = await db.getZazzleConfig();
        if (!config) {
          return jsonResponse({ error: 'Zazzle config not found' }, 404);
        }
        return jsonResponse(config);
      } else if (request.method === 'PUT' || request.method === 'PATCH') {
        const updates = await request.json();
        const updated = await db.updateZazzleConfig(updates);
        return jsonResponse(updated);
      }
      break;
      
    default:
      return jsonResponse({ error: 'Config type not found' }, 404);
  }
  
  return jsonResponse({ error: 'Method not allowed' }, 405);
}

/**
 * Navigation endpoints
 */
async function handleNavigation(request, db) {
  if (request.method !== 'GET') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }
  
  const navigation = await db.getNavigationWithChildren();
  return jsonResponse(navigation);
}

/**
 * Helper: JSON response with CORS
 */
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Helper: Generate unique ID
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
