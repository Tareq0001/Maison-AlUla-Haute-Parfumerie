import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        collections: resolve(__dirname, 'collections.html'),
        atelier: resolve(__dirname, 'atelier.html'),
        journal: resolve(__dirname, 'journal.html'),
        checkout: resolve(__dirname, 'checkout.html')
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});
