/**
 * Cloudflare Worker for Linefulness
 * Handles edge caching, API routes, and redirects
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      return handleApiRequest(request, env);
    }
    
    // Handle Zazzle webhooks (if implemented)
    if (url.pathname.startsWith('/webhook/zazzle')) {
      return handleZazzleWebhook(request, env);
    }
    
    // Cache RealView image requests
    if (url.searchParams.has('zazzle_preview')) {
      return handleCachedImage(request, ctx);
    }
    
    // Security headers for all responses
    const response = await fetch(request);
    const modifiedResponse = new Response(response.body, response);
    
    // Add security headers
    modifiedResponse.headers.set('X-Frame-Options', 'DENY');
    modifiedResponse.headers.set('X-Content-Type-Options', 'nosniff');
    modifiedResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    modifiedResponse.headers.set('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
    
    // Content Signals - allow search indexing, disallow AI training
    modifiedResponse.headers.set('Content-Signal', 'search=yes,ai-train=no');
    
    // Add cache headers for static assets
    if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|css|js)$/)) {
      modifiedResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    
    return modifiedResponse;
  }
};

/**
 * Handle API requests
 */
async function handleApiRequest(request, env) {
  const url = new URL(request.url);
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Health check endpoint
  if (url.pathname === '/api/health') {
    return new Response(
      JSON.stringify({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
  
  // Validate Zazzle configuration
  if (url.pathname === '/api/config/validate') {
    const config = {
      hasAssociateId: !!env.ZAZZLE_ASSOCIATE_ID,
      hasMemberId: !!env.ZAZZLE_MEMBER_ID,
      hasStoreId: !!env.ZAZZLE_STORE_ID,
      hasCategoryId: !!env.ZAZZLE_CATEGORY_ID,
    };
    
    return new Response(
      JSON.stringify({ 
        valid: Object.values(config).every(Boolean),
        config: config
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
  
  return new Response('Not Found', { status: 404, headers: corsHeaders });
}

/**
 * Handle Zazzle webhooks
 */
async function handleZazzleWebhook(request, env) {
  // Verify webhook signature if implemented
  // Process order updates, etc.
  
  return new Response('OK', { status: 200 });
}

/**
 * Handle cached image requests
 */
async function handleCachedImage(request, ctx) {
  const cache = caches.default;
  const cacheKey = new Request(request.url, request);
  
  // Check cache first
  let response = await cache.match(cacheKey);
  
  if (!response) {
    // Fetch from origin
    response = await fetch(request);
    
    // Clone response for caching
    const responseToCache = response.clone();
    
    // Cache for 1 hour
    responseToCache.headers.set('Cache-Control', 'public, max-age=3600');
    ctx.waitUntil(cache.put(cacheKey, responseToCache));
  }
  
  return response;
}
