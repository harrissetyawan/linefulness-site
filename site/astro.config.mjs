import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";

// Generate serialize function for custom priorities
const generateSerialize = () => {
  return (item) => {
    const url = new URL(item.url);
    const path = url.pathname;
    
    // Determine priority based on path depth
    let priority = 0.5;
    if (path === '/') {
      priority = 1.0;
    } else if (path.split('/').filter(Boolean).length === 1) {
      // Niche landing page: /lakes/, /beaches/
      priority = 0.9;
    } else if (path.split('/').filter(Boolean).length === 2) {
      // Product page: /lakes/lake-tahoe/
      priority = 0.8;
    }
    
    return {
      ...item,
      priority,
      changefreq: 'daily',
      lastmod: new Date().toISOString(),
    };
  };
};

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 4321,
  },
  output: 'static',
  site: 'https://linefulness.com',
  integrations: [
    sitemap({
      serialize: generateSerialize(),
      // Include all pages except API routes and sitemap itself
      filter: (page) => {
        const url = new URL(page);
        const path = url.pathname;
        // Exclude non-HTML pages and special routes
        return !path.includes('robots.txt') && 
               !path.includes('sitemap') &&
               !path.startsWith('/api/');
      },
    })
  ]
});