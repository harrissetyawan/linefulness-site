# Linefulness Deployment Guide

## Prerequisites

1. **Cloudflare Account** with access to:
   - Cloudflare Pages
   - Cloudflare Workers (optional, for edge functions)

2. **Wrangler CLI** installed:
   ```bash
   npm install -g wrangler
   ```

3. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

## Configuration

### 1. Zazzle API Setup

Ensure your `project_config.json` has valid Zazzle credentials:

```json
{
  "zazzle_credentials": {
    "associate_id_rf": "your-associate-id",
    "member_id_at": "your-member-id",
    "store_id_sr": "your-store-id",
    "category_id_cg": "your-category-id"
  }
}
```

### 2. Image Hosting Domain Declaration

Before deploying, declare your image hosting domain in Zazzle Associate Settings:

1. Go to: https://www.zazzle.com/my/associate/domains
2. Add your domains:
   - `linefulness.com`
   - `www.linefulness.com`
   - `images.linefulness.com` (if using separate image hosting)

### 3. Template Setup

Ensure your Zazzle templates are:
- Set to **Public** visibility
- Marked as **G-Rated**
- Placed in the correct category (for 1-to-Many mode)

## Deployment

### Quick Deploy

```bash
# Deploy to production
./deploy.sh production

# Deploy to staging
./deploy.sh staging
```

### Manual Deploy

```bash
# Build the site
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=linefulness
```

## Environment Variables

Set these secrets using Wrangler:

```bash
# Optional: If using KV or secrets
wrangler secret put ZAZZLE_ASSOCIATE_ID
wrangler secret put ZAZZLE_MEMBER_ID
```

## Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] Product grid displays with RealView images
- [ ] Individual product pages render
- [ ] "Customize on Zazzle" buttons link correctly
- [ ] Sitemap is accessible at `/sitemap-index.xml`
- [ ] SEO meta tags are correct
- [ ] Images load properly
- [ ] Mobile responsive design works

## Testing Zazzle Integration

1. Visit any lake product page (e.g., `/products/lake-tahoe`)
2. Click "Customize on Zazzle"
3. Verify:
   - Products load in Zazzle
   - Location name is pre-populated
   - Affiliate ID is in the URL
   - Can customize and add to cart

## Troubleshooting

### RealView Images Not Loading
- Check template Product IDs are correct
- Verify templates are public and G-rated
- Check browser console for errors

### Linkover Not Working
- Verify Zazzle credentials in `project_config.json`
- Check that category ID is correct for 1-to-Many mode
- Ensure `ax=DesignBlast` parameter is present

### Build Errors
```bash
# Clean and rebuild
rm -rf dist node_modules .astro
npm install
npm run build
```

## Performance Optimization

The site includes:
- Lazy loading for images
- Skeleton loading states
- Static generation (SSG)
- Optimized RealView images (600px, no branding)
- Gzip compression via Cloudflare

## Monitoring

After deployment, monitor:
- Cloudflare Analytics
- Zazzle Affiliate dashboard
- Search Console for SEO performance
