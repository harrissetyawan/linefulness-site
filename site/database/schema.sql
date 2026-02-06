-- Cloudflare D1 Database Schema for Linefulness
-- Database ID: d6604869-55c5-4509-b0a6-362241f8dd68

-- Enable foreign key support
PRAGMA foreign_keys = ON;

-- Niches table (lakes, beaches, cities, gifts, etc.)
CREATE TABLE IF NOT EXISTS niches (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    primary_color TEXT,
    hero_image TEXT,
    seo_title TEXT,
    seo_description TEXT,
    hero_title TEXT,
    hero_subtitle TEXT,
    hero_cta_primary TEXT,
    hero_cta_secondary TEXT,
    collection_title TEXT,
    collection_subtitle TEXT,
    section_title TEXT,
    section_subtitle TEXT,
    is_active BOOLEAN DEFAULT 1,
    is_default BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Locations table (lakes, beaches, cities, etc.)
CREATE TABLE IF NOT EXISTS locations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    type TEXT NOT NULL,
    niche_id TEXT NOT NULL,
    metadata TEXT, -- JSON for additional data
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (niche_id) REFERENCES niches(id) ON DELETE CASCADE,
    UNIQUE(niche_id, slug)
);

-- Product Templates table
CREATE TABLE IF NOT EXISTS templates (
    id TEXT PRIMARY KEY,
    niche_id TEXT NOT NULL,
    type TEXT NOT NULL,
    product_id_pd TEXT NOT NULL,
    text_variable TEXT NOT NULL,
    image_variable TEXT NOT NULL,
    max_text_length INTEGER,
    image_aspect_ratio TEXT,
    realview_max_dim INTEGER DEFAULT 600,
    realview_text_color TEXT DEFAULT '000000',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (niche_id) REFERENCES niches(id) ON DELETE CASCADE
);

-- Site Configuration table
CREATE TABLE IF NOT EXISTS site_config (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    brand_name TEXT NOT NULL,
    brand_tagline TEXT,
    footer_tagline TEXT,
    footer_description TEXT,
    site_url TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Navigation Items table
CREATE TABLE IF NOT EXISTS navigation (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    parent_id TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES navigation(id) ON DELETE CASCADE
);

-- Zazzle Configuration table
CREATE TABLE IF NOT EXISTS zazzle_config (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    associate_id_rf TEXT NOT NULL,
    member_id_at TEXT NOT NULL,
    store_id_sr TEXT NOT NULL,
    category_id_cg TEXT NOT NULL,
    realview_base_url TEXT DEFAULT 'https://rlv.zazzle.com/svc/view',
    linkover_base_url TEXT DEFAULT 'https://www.zazzle.com/api/create',
    cache_duration INTEGER DEFAULT 86400,
    timeout_ms INTEGER DEFAULT 10000,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- API Request Logs (for analytics)
CREATE TABLE IF NOT EXISTS api_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL,
    status_code INTEGER,
    response_time_ms INTEGER,
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_locations_niche ON locations(niche_id);
CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations(slug);
CREATE INDEX IF NOT EXISTS idx_locations_type ON locations(type);
CREATE INDEX IF NOT EXISTS idx_templates_niche ON templates(niche_id);
CREATE INDEX IF NOT EXISTS idx_templates_active ON templates(is_active);
CREATE INDEX IF NOT EXISTS idx_niches_slug ON niches(slug);
CREATE INDEX IF NOT EXISTS idx_niches_active ON niches(is_active);
CREATE INDEX IF NOT EXISTS idx_navigation_parent ON navigation(parent_id);
CREATE INDEX IF NOT EXISTS idx_api_logs_endpoint ON api_logs(endpoint);
CREATE INDEX IF NOT EXISTS idx_api_logs_created ON api_logs(created_at);

-- Triggers for updated_at
CREATE TRIGGER IF NOT EXISTS update_niches_timestamp 
AFTER UPDATE ON niches
BEGIN
    UPDATE niches SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_locations_timestamp 
AFTER UPDATE ON locations
BEGIN
    UPDATE locations SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_templates_timestamp 
AFTER UPDATE ON templates
BEGIN
    UPDATE templates SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
