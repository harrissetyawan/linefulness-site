# Linefulness

Custom lake merchandise for camping enthusiasts. Personalized mugs, sweatshirts, and hats featuring 100+ famous camping lakes.

## Overview

Linefulness is a programmatic SEO platform that generates niche product landing pages for lake destinations. It integrates with the Zazzle API for on-demand product fulfillment.

## Tech Stack

- **Framework**: AstroJS v5 (Static Site Generation)
- **Styling**: TailwindCSS v4
- **Deployment**: Cloudflare Pages + Workers
- **Product Fulfillment**: Zazzle API (RealView + Linkover)

## Features

- 🏕️ **100 Lake Locations** - Famous camping lakes across the US
- 🎨 **Dynamic Product Previews** - Zazzle RealView API integration
- 🛒 **1-to-Many Templates Buffet** - Show multiple products with one link
- ⚡ **Static Generation** - 101 pages built at deploy time
- 🔍 **SEO Optimized** - Dynamic meta tags, sitemap, Open Graph
- 📱 **Responsive Design** - Mobile-first with TailwindCSS
- 🚀 **Edge Deployed** - Cloudflare Pages for global CDN

## Project Structure

```
├── src/
│   ├── components/       # Astro components
│   │   ├── landing/      # Homepage sections
│   │   └── products/     # Product page components
│   ├── data/
│   │   └── locations.json # 100 lake locations
│   ├── lib/
│   │   └── zazzle.ts     # Zazzle API utilities
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro   # Homepage
│       └── products/
│           └── [slug].astro # Dynamic product pages
├── workers/
│   └── index.js          # Cloudflare Worker
├── project_config.json   # Zazzle credentials & templates
├── wrangler.toml         # Cloudflare deployment config
└── deploy.sh             # Deployment script
```

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Deployment

### Prerequisites

1. Install Wrangler CLI: `npm install -g wrangler`
2. Login: `wrangler login`
3. Configure Zazzle credentials in `project_config.json`

### Deploy

```bash
# Production
npm run deploy
# or
./deploy.sh production

# Staging
npm run deploy:staging
# or
./deploy.sh staging
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## Zazzle API Integration

### RealView (Product Previews)

Generates dynamic product images:
```
https://rlv.zazzle.com/svc/view?pid={template_id}&max_dim=600&t_text1_txt={location_name}
```

### Linkover (1-to-Many / Templates Buffet)

Redirects to Zazzle with pre-populated data:
```
https://www.zazzle.com/api/create/at-{member_id}?ax=DesignBlast&sr={store_id}&cg={category_id}&rf={associate_id}&t_text1_txt={location_name}
```

## Configuration

Edit `project_config.json` to customize:

```json
{
  "zazzle_credentials": {
    "associate_id_rf": "your-associate-id",
    "member_id_at": "your-member-id",
    "store_id_sr": "your-store-id",
    "category_id_cg": "your-category-id"
  },
  "template_inventory": [
    {
      "type": "Mug",
      "product_id_pd": "your-template-id",
      "parameter_mapping": {
        "text_variable": "t_text1_txt"
      }
    }
  ]
}
```

## Data Pipeline

Location data is sourced from `locations.toon` and converted to `src/data/locations.json`:

```json
{
  "locations": [
    { "name": "Lake Tahoe", "type": "Lake", "slug": "lake-tahoe" },
    ...
  ]
}
```

## Performance

- **Static Generation**: All 101 pages pre-built at deploy
- **Lazy Loading**: Images load on scroll
- **Skeleton States**: Loading placeholders for better UX
- **Optimized Images**: 600px RealView (no Zazzle branding)
- **Edge Caching**: Cloudflare CDN

## License

MIT
