#!/bin/bash

# Linefulness Deployment Script
# Deploys the Astro site to Cloudflare Pages

set -e

echo "🚀 Starting Linefulness deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}Error: wrangler is not installed${NC}"
    echo "Install it with: npm install -g wrangler"
    exit 1
fi

# Check if logged in to Cloudflare
if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}Please login to Cloudflare first...${NC}"
    wrangler login
fi

# Determine environment
ENVIRONMENT=${1:-production}
if [[ "$ENVIRONMENT" != "production" && "$ENVIRONMENT" != "staging" ]]; then
    echo -e "${RED}Error: Environment must be 'production' or 'staging'${NC}"
    echo "Usage: ./deploy.sh [production|staging]"
    exit 1
fi

echo -e "${YELLOW}Building for $ENVIRONMENT...${NC}"

# Clean previous build
rm -rf dist

# Build the site
npm run build

# Verify build output
if [ ! -d "dist" ]; then
    echo -e "${RED}Error: Build failed - dist directory not found${NC}"
    exit 1
fi

# Count generated pages
PAGE_COUNT=$(find dist -name "*.html" | wc -l)
echo -e "${GREEN}✓ Built $PAGE_COUNT pages${NC}"

# Check sitemap
if [ -f "dist/sitemap-0.xml" ]; then
    URL_COUNT=$(grep -o '<loc>' dist/sitemap-0.xml | wc -l)
    echo -e "${GREEN}✓ Sitemap contains $URL_COUNT URLs${NC}"
fi

# Deploy to Cloudflare Pages
echo -e "${YELLOW}Deploying to Cloudflare Pages ($ENVIRONMENT)...${NC}"

if [ "$ENVIRONMENT" = "production" ]; then
    wrangler pages deploy dist --project-name=linefulness --branch=main
else
    wrangler pages deploy dist --project-name=linefulness-staging --branch=staging
fi

echo -e "${GREEN}✓ Deployment complete!${NC}"

# Show deployment URL
if [ "$ENVIRONMENT" = "production" ]; then
    echo -e "${GREEN}Live at: https://linefulness.com${NC}"
else
    echo -e "${GREEN}Staging at: https://staging.linefulness.com${NC}"
fi

echo ""
echo "📊 Next steps:"
echo "  - Test a few product pages"
echo "  - Verify Zazzle links work correctly"
echo "  - Check analytics"
