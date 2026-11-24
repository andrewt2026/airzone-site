import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URLs match the old WordPress site exactly (trailing slashes), so no redirects are needed.
export default defineConfig({
  site: 'https://airzoneexperts.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: false,
  integrations: [sitemap({ filter: (page) => !page.includes('/404') && !page.includes('/page/') })],
});
