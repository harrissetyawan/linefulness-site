/**
 * Sitemap Utility
 * Generates dynamic sitemap entries for all niches and locations
 */

import nichesData from '../data/niches.json';
import sitemapConfig from '../data/sitemap.json';

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

/**
 * Generate all sitemap entries
 */
export function generateSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const now = new Date().toISOString();
  const { changefreq, priority } = sitemapConfig;

  // Homepage
  entries.push({
    url: '/',
    lastmod: now,
    changefreq,
    priority: priority.home,
  });

  // Niche pages and product pages
  nichesData.niches.forEach((niche) => {
    // Niche landing page
    entries.push({
      url: `/${niche.slug}/`,
      lastmod: now,
      changefreq,
      priority: priority.niche,
    });

    // Product detail pages
    niche.locations.forEach((location) => {
      entries.push({
        url: `/${niche.slug}/${location.slug}/`,
        lastmod: now,
        changefreq,
        priority: priority.product,
      });
    });
  });

  return entries;
}

/**
 * Generate sitemap XML content
 */
export function generateSitemapXML(): string {
  const entries = generateSitemapEntries();
  const { siteUrl } = sitemapConfig;

  const urlEntries = entries
    .map(
      (entry) => `
  <url>
    <loc>${siteUrl}${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : ''}
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Get total page count for SEO
 */
export function getTotalPageCount(): number {
  let count = 1; // Homepage
  
  nichesData.niches.forEach((niche) => {
    count += 1; // Niche landing page
    count += niche.locations.length; // Product pages
  });
  
  return count;
}

/**
 * Get page count by niche
 */
export function getNichePageCount(nicheSlug: string): number {
  const niche = nichesData.niches.find((n) => n.slug === nicheSlug);
  if (!niche) return 0;
  
  return 1 + niche.locations.length; // Landing + products
}
