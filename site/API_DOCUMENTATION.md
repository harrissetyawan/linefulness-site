# Linefulness REST API Documentation

## Overview

The Linefulness REST API provides CRUD operations for managing niches, locations, templates, and configuration data stored in Cloudflare D1 database.

**Base URL:** `https://linefulness.com/api`

**Database ID:** `d6604869-55c5-4509-b0a6-362241f8dd68`

## Authentication

Currently, the API is open for read operations. Write operations should be protected in production using API keys or authentication tokens.

## CORS

The API supports Cross-Origin Resource Sharing (CORS) for all origins:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## Endpoints

### Health Check

#### GET /api/health
Check API and database connectivity.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "database": "connected"
}
```

### Niches

#### GET /api/niches
List all niches.

**Response:**
```json
[
  {
    "id": "lakes",
    "name": "Lakes",
    "slug": "lakes",
    "icon": "🏕️",
    "primary_color": "orange",
    "seo_title": "Custom Lake Merchandise & Gifts",
    ...
  }
]
```

#### GET /api/niches/{slug|id}
Get a specific niche by slug or ID.

**Response:**
```json
{
  "id": "lakes",
  "name": "Lakes",
  "slug": "lakes",
  ...
}
```

#### POST /api/niches
Create a new niche.

**Request Body:**
```json
{
  "id": "mountains",
  "name": "Mountains",
  "slug": "mountains",
  "icon": "⛰️",
  "primary_color": "green",
  "seo_title": "Custom Mountain Merchandise",
  "seo_description": "Personalized products featuring mountains",
  "hero_title": "Mountain Merchandise",
  "hero_subtitle": "Discover personalized mountain products",
  "hero_cta_primary": "Browse Mountains",
  "hero_cta_secondary": "View All",
  "collection_title": "Collection",
  "collection_subtitle": "Custom {type}s featuring mountains",
  "section_title": "All Mountains",
  "section_subtitle": "Browse all {count} mountains"
}
```

#### PUT /api/niches/{id}
Update a niche completely.

#### PATCH /api/niches/{id}
Partially update a niche.

**Request Body:**
```json
{
  "name": "Updated Name",
  "seo_title": "Updated SEO Title"
}
```

#### DELETE /api/niches/{id}
Delete a niche.

**Response:** `204 No Content`

### Locations

#### GET /api/locations
List all locations.

**Query Parameters:**
- `niche_id` (optional): Filter by niche ID

**Response:**
```json
[
  {
    "id": "lake-tahoe",
    "name": "Lake Tahoe",
    "slug": "lake-tahoe",
    "type": "Lake",
    "niche_id": "lakes",
    "is_active": true
  }
]
```

#### GET /api/locations/{slug|id}
Get a specific location.

#### POST /api/locations
Create a new location.

**Request Body:**
```json
{
  "id": "lake-tahoe-new",
  "name": "Lake Tahoe",
  "slug": "lake-tahoe",
  "type": "Lake",
  "niche_id": "lakes",
  "metadata": "{\"elevation\": \"6225 ft\"}"
}
```

#### PUT /api/locations/{id}
Update a location completely.

#### PATCH /api/locations/{id}
Partially update a location.

#### DELETE /api/locations/{id}
Delete a location.

### Templates

#### GET /api/templates
List all product templates.

**Query Parameters:**
- `niche_id` (optional): Filter by niche ID

**Response:**
```json
[
  {
    "id": "template-lake-mug",
    "niche_id": "lakes",
    "type": "Mug",
    "product_id_pd": "256657138688428297",
    "text_variable": "t_text1_txt",
    "image_variable": "t_image1_iid",
    "max_text_length": 25,
    "image_aspect_ratio": "1:1",
    "realview_max_dim": 600,
    "realview_text_color": "000000",
    "display_order": 1
  }
]
```

#### GET /api/templates/{id}
Get a specific template.

#### POST /api/templates
Create a new template.

**Request Body:**
```json
{
  "id": "template-mountain-mug",
  "niche_id": "mountains",
  "type": "Mug",
  "product_id_pd": "256657138688428297",
  "text_variable": "t_text1_txt",
  "image_variable": "t_image1_iid",
  "max_text_length": 25,
  "image_aspect_ratio": "1:1",
  "display_order": 1
}
```

#### PUT /api/templates/{id}
Update a template completely.

#### PATCH /api/templates/{id}
Partially update a template.

#### DELETE /api/templates/{id}
Delete a template.

### Configuration

#### GET /api/config/site
Get site configuration.

**Response:**
```json
{
  "id": 1,
  "brand_name": "Linefulness",
  "brand_tagline": "Custom Merchandise for Every Passion",
  "footer_tagline": "Custom merchandise for every passion.",
  "footer_description": "Personalized products...",
  "site_url": "https://linefulness.com"
}
```

#### PUT /api/config/site
Update site configuration.

#### GET /api/config/zazzle
Get Zazzle API configuration.

**Response:**
```json
{
  "id": 1,
  "associate_id_rf": "238975517577791237",
  "member_id_at": "238975517577791237",
  "store_id_sr": "linefulness",
  "category_id_cg": "196167236993318158",
  "realview_base_url": "https://rlv.zazzle.com/svc/view",
  "linkover_base_url": "https://www.zazzle.com/api/create"
}
```

#### PUT /api/config/zazzle
Update Zazzle configuration.

### Navigation

#### GET /api/navigation
Get navigation structure with children.

**Response:**
```json
[
  {
    "id": "nav-home",
    "label": "Home",
    "href": "/",
    "children": []
  },
  {
    "id": "nav-collections",
    "label": "Collections",
    "href": "/#niches",
    "children": [
      {
        "id": "nav-lakes",
        "label": "Lakes",
        "href": "/lakes",
        "description": "Custom lake merchandise"
      }
    ]
  }
]
```

## Database Schema

### Tables

#### niches
- `id` (TEXT PRIMARY KEY)
- `name` (TEXT NOT NULL)
- `slug` (TEXT NOT NULL UNIQUE)
- `icon` (TEXT)
- `primary_color` (TEXT)
- `hero_image` (TEXT)
- `seo_title` (TEXT)
- `seo_description` (TEXT)
- `hero_title` (TEXT)
- `hero_subtitle` (TEXT)
- `hero_cta_primary` (TEXT)
- `hero_cta_secondary` (TEXT)
- `collection_title` (TEXT)
- `collection_subtitle` (TEXT)
- `section_title` (TEXT)
- `section_subtitle` (TEXT)
- `is_active` (BOOLEAN DEFAULT 1)
- `is_default` (BOOLEAN DEFAULT 0)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

#### locations
- `id` (TEXT PRIMARY KEY)
- `name` (TEXT NOT NULL)
- `slug` (TEXT NOT NULL)
- `type` (TEXT NOT NULL)
- `niche_id` (TEXT NOT NULL, FOREIGN KEY)
- `metadata` (TEXT - JSON)
- `is_active` (BOOLEAN DEFAULT 1)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

#### templates
- `id` (TEXT PRIMARY KEY)
- `niche_id` (TEXT NOT NULL, FOREIGN KEY)
- `type` (TEXT NOT NULL)
- `product_id_pd` (TEXT NOT NULL)
- `text_variable` (TEXT NOT NULL)
- `image_variable` (TEXT NOT NULL)
- `max_text_length` (INTEGER)
- `image_aspect_ratio` (TEXT)
- `realview_max_dim` (INTEGER DEFAULT 600)
- `realview_text_color` (TEXT DEFAULT '000000')
- `display_order` (INTEGER DEFAULT 0)
- `is_active` (BOOLEAN DEFAULT 1)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

## Error Responses

All errors follow this format:

```json
{
  "error": "Error description",
  "message": "Detailed error message (if available)"
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

## Usage Examples

### cURL Examples

**Get all niches:**
```bash
curl https://linefulness.com/api/niches
```

**Create a new location:**
```bash
curl -X POST https://linefulness.com/api/locations \
  -H "Content-Type: application/json" \
  -d '{
    "id": "lake-tahoe",
    "name": "Lake Tahoe",
    "slug": "lake-tahoe",
    "type": "Lake",
    "niche_id": "lakes"
  }'
```

**Update a niche:**
```bash
curl -X PATCH https://linefulness.com/api/niches/lakes \
  -H "Content-Type: application/json" \
  -d '{"seo_title": "Updated Title"}'
```

**Delete a template:**
```bash
curl -X DELETE https://linefulness.com/api/templates/template-lake-mug
```

## Database Management

### Local Development

1. **Create local D1 database:**
```bash
wrangler d1 create linefulness-db
```

2. **Apply schema:**
```bash
wrangler d1 execute linefulness-db --file=database/schema.sql
```

3. **Seed data:**
```bash
wrangler d1 execute linefulness-db --file=database/seed.sql
```

### Production

The database is already configured in `wrangler.toml` with ID: `d6604869-55c5-4509-b0a6-362241f8dd68`

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production use.
