import type { APIRoute } from 'astro';
import nichesData from '../data/niches.json';

export const GET: APIRoute = () => {
  const siteUrl = 'https://linefulness.com';
  
  // Generate niche-specific allow rules
  const nicheRules = (nichesData as any).niches.map((niche: any) => 
    `Allow: /${niche.slug}/`
  ).join('\n');

  const robotsTxt = `
User-agent: *
Allow: /
${nicheRules}

# Sitemaps
Sitemap: ${siteUrl}/sitemap-0.xml
Sitemap: ${siteUrl}/sitemap-index.xml

# Crawl rate
Crawl-delay: 1

# Host
Host: ${siteUrl}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
