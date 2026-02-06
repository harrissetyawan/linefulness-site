/**
 * Database utilities for Cloudflare D1
 * Provides type-safe database access and query builders
 */

export interface Niche {
  id: string;
  name: string;
  slug: string;
  icon: string;
  primary_color: string;
  hero_image: string | null;
  seo_title: string;
  seo_description: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  collection_title: string;
  collection_subtitle: string;
  section_title: string;
  section_subtitle: string;
  is_active: boolean;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  type: string;
  niche_id: string;
  metadata: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: string;
  niche_id: string;
  type: string;
  product_id_pd: string;
  text_variable: string;
  image_variable: string;
  max_text_length: number | null;
  image_aspect_ratio: string | null;
  realview_max_dim: number;
  realview_text_color: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteConfig {
  id: number;
  brand_name: string;
  brand_tagline: string;
  footer_tagline: string;
  footer_description: string;
  site_url: string;
  updated_at: string;
}

export interface Navigation {
  id: string;
  label: string;
  href: string;
  parent_id: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ZazzleConfig {
  id: number;
  associate_id_rf: string;
  member_id_at: string;
  store_id_sr: string;
  category_id_cg: string;
  realview_base_url: string;
  linkover_base_url: string;
  cache_duration: number;
  timeout_ms: number;
  updated_at: string;
}

/**
 * Database client for D1
 */
export class Database {
  constructor(private db: D1Database) {}

  // Niches
  async getAllNiches(): Promise<Niche[]> {
    const result = await this.db.prepare(
      'SELECT * FROM niches WHERE is_active = 1 ORDER BY name'
    ).all();
    return result.results as Niche[];
  }

  async getNicheBySlug(slug: string): Promise<Niche | null> {
    const result = await this.db.prepare(
      'SELECT * FROM niches WHERE slug = ? AND is_active = 1'
    ).bind(slug).first();
    return result as Niche | null;
  }

  async getNicheById(id: string): Promise<Niche | null> {
    const result = await this.db.prepare(
      'SELECT * FROM niches WHERE id = ?'
    ).bind(id).first();
    return result as Niche | null;
  }

  async createNiche(niche: Omit<Niche, 'created_at' | 'updated_at'>): Promise<Niche> {
    await this.db.prepare(
      `INSERT INTO niches (id, name, slug, icon, primary_color, hero_image, 
       seo_title, seo_description, hero_title, hero_subtitle, hero_cta_primary, 
       hero_cta_secondary, collection_title, collection_subtitle, section_title, 
       section_subtitle, is_active, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      niche.id, niche.name, niche.slug, niche.icon, niche.primary_color, niche.hero_image,
      niche.seo_title, niche.seo_description, niche.hero_title, niche.hero_subtitle,
      niche.hero_cta_primary, niche.hero_cta_secondary, niche.collection_title,
      niche.collection_subtitle, niche.section_title, niche.section_subtitle,
      niche.is_active ? 1 : 0, niche.is_default ? 1 : 0
    ).run();
    return this.getNicheById(niche.id) as Promise<Niche>;
  }

  async updateNiche(id: string, updates: Partial<Niche>): Promise<Niche | null> {
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
        fields.push(`${key} = ?`);
        values.push(typeof value === 'boolean' ? (value ? 1 : 0) : value);
      }
    });
    
    if (fields.length === 0) return this.getNicheById(id);
    
    values.push(id);
    await this.db.prepare(
      `UPDATE niches SET ${fields.join(', ')} WHERE id = ?`
    ).bind(...values).run();
    
    return this.getNicheById(id);
  }

  async deleteNiche(id: string): Promise<boolean> {
    const result = await this.db.prepare(
      'DELETE FROM niches WHERE id = ?'
    ).bind(id).run();
    return result.success;
  }

  // Locations
  async getAllLocations(): Promise<Location[]> {
    const result = await this.db.prepare(
      'SELECT * FROM locations WHERE is_active = 1 ORDER BY name'
    ).all();
    return result.results as Location[];
  }

  async getLocationsByNiche(nicheId: string): Promise<Location[]> {
    const result = await this.db.prepare(
      'SELECT * FROM locations WHERE niche_id = ? AND is_active = 1 ORDER BY name'
    ).bind(nicheId).all();
    return result.results as Location[];
  }

  async getLocationBySlug(slug: string, nicheId?: string): Promise<Location | null> {
    let query = 'SELECT * FROM locations WHERE slug = ? AND is_active = 1';
    const params: any[] = [slug];
    
    if (nicheId) {
      query += ' AND niche_id = ?';
      params.push(nicheId);
    }
    
    const result = await this.db.prepare(query).bind(...params).first();
    return result as Location | null;
  }

  async getLocationById(id: string): Promise<Location | null> {
    const result = await this.db.prepare(
      'SELECT * FROM locations WHERE id = ?'
    ).bind(id).first();
    return result as Location | null;
  }

  async createLocation(location: Omit<Location, 'created_at' | 'updated_at'>): Promise<Location> {
    await this.db.prepare(
      `INSERT INTO locations (id, name, slug, type, niche_id, metadata, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      location.id, location.name, location.slug, location.type, location.niche_id,
      location.metadata, location.is_active ? 1 : 0
    ).run();
    return this.getLocationById(location.id) as Promise<Location>;
  }

  async updateLocation(id: string, updates: Partial<Location>): Promise<Location | null> {
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
        fields.push(`${key} = ?`);
        values.push(typeof value === 'boolean' ? (value ? 1 : 0) : value);
      }
    });
    
    if (fields.length === 0) return this.getLocationById(id);
    
    values.push(id);
    await this.db.prepare(
      `UPDATE locations SET ${fields.join(', ')} WHERE id = ?`
    ).bind(...values).run();
    
    return this.getLocationById(id);
  }

  async deleteLocation(id: string): Promise<boolean> {
    const result = await this.db.prepare(
      'DELETE FROM locations WHERE id = ?'
    ).bind(id).run();
    return result.success;
  }

  // Templates
  async getAllTemplates(): Promise<Template[]> {
    const result = await this.db.prepare(
      'SELECT * FROM templates WHERE is_active = 1 ORDER BY display_order'
    ).all();
    return result.results as Template[];
  }

  async getTemplatesByNiche(nicheId: string): Promise<Template[]> {
    const result = await this.db.prepare(
      'SELECT * FROM templates WHERE niche_id = ? AND is_active = 1 ORDER BY display_order'
    ).bind(nicheId).all();
    return result.results as Template[];
  }

  async getTemplateById(id: string): Promise<Template | null> {
    const result = await this.db.prepare(
      'SELECT * FROM templates WHERE id = ?'
    ).bind(id).first();
    return result as Template | null;
  }

  async createTemplate(template: Omit<Template, 'created_at' | 'updated_at'>): Promise<Template> {
    await this.db.prepare(
      `INSERT INTO templates (id, niche_id, type, product_id_pd, text_variable, 
       image_variable, max_text_length, image_aspect_ratio, realview_max_dim, 
       realview_text_color, display_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      template.id, template.niche_id, template.type, template.product_id_pd,
      template.text_variable, template.image_variable, template.max_text_length,
      template.image_aspect_ratio, template.realview_max_dim, template.realview_text_color,
      template.display_order, template.is_active ? 1 : 0
    ).run();
    return this.getTemplateById(template.id) as Promise<Template>;
  }

  async updateTemplate(id: string, updates: Partial<Template>): Promise<Template | null> {
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
        fields.push(`${key} = ?`);
        values.push(typeof value === 'boolean' ? (value ? 1 : 0) : value);
      }
    });
    
    if (fields.length === 0) return this.getTemplateById(id);
    
    values.push(id);
    await this.db.prepare(
      `UPDATE templates SET ${fields.join(', ')} WHERE id = ?`
    ).bind(...values).run();
    
    return this.getTemplateById(id);
  }

  async deleteTemplate(id: string): Promise<boolean> {
    const result = await this.db.prepare(
      'DELETE FROM templates WHERE id = ?'
    ).bind(id).run();
    return result.success;
  }

  // Site Config
  async getSiteConfig(): Promise<SiteConfig | null> {
    const result = await this.db.prepare(
      'SELECT * FROM site_config WHERE id = 1'
    ).first();
    return result as SiteConfig | null;
  }

  async updateSiteConfig(updates: Partial<SiteConfig>): Promise<SiteConfig | null> {
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'updated_at') {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (fields.length === 0) return this.getSiteConfig();
    
    await this.db.prepare(
      `UPDATE site_config SET ${fields.join(', ')} WHERE id = 1`
    ).bind(...values).run();
    
    return this.getSiteConfig();
  }

  // Navigation
  async getAllNavigation(): Promise<Navigation[]> {
    const result = await this.db.prepare(
      `SELECT * FROM navigation 
       WHERE is_active = 1 
       ORDER BY parent_id NULLS FIRST, display_order`
    ).all();
    return result.results as Navigation[];
  }

  async getNavigationWithChildren(): Promise<(Navigation & { children?: Navigation[] })[]> {
    const allNav = await this.getAllNavigation();
    const parentNav = allNav.filter(n => !n.parent_id);
    
    return parentNav.map(parent => ({
      ...parent,
      children: allNav.filter(n => n.parent_id === parent.id)
    }));
  }

  // Zazzle Config
  async getZazzleConfig(): Promise<ZazzleConfig | null> {
    const result = await this.db.prepare(
      'SELECT * FROM zazzle_config WHERE id = 1'
    ).first();
    return result as ZazzleConfig | null;
  }

  async updateZazzleConfig(updates: Partial<ZazzleConfig>): Promise<ZazzleConfig | null> {
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'updated_at') {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (fields.length === 0) return this.getZazzleConfig();
    
    await this.db.prepare(
      `UPDATE zazzle_config SET ${fields.join(', ')} WHERE id = 1`
    ).bind(...values).run();
    
    return this.getZazzleConfig();
  }

  // API Logs
  async logApiRequest(log: {
    endpoint: string;
    method: string;
    status_code?: number;
    response_time_ms?: number;
    ip_address?: string;
    user_agent?: string;
  }): Promise<void> {
    await this.db.prepare(
      `INSERT INTO api_logs (endpoint, method, status_code, response_time_ms, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      log.endpoint, log.method, log.status_code || null, log.response_time_ms || null,
      log.ip_address || null, log.user_agent || null
    ).run();
  }
}

/**
 * Create database client from D1 binding
 */
export function createDatabase(db: D1Database): Database {
  return new Database(db);
}
