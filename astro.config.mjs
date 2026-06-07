// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://raulhurtadomorales.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
