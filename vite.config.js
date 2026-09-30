import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'resources',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'all-forms': resolve(__dirname, 'assets/src/pages/index-all-forms.jsx'),
        'entries': resolve(__dirname, 'assets/src/pages/index-entries.jsx'),
        'form-editor': resolve(__dirname, 'assets/src/pages/index-form-editor.jsx'),
        'settings': resolve(__dirname, 'assets/src/pages/index-settings.jsx'),
        'form-settings': resolve(__dirname, 'assets/src/pages/index-form-settings.jsx'),
        'single-entry': resolve(__dirname, 'assets/src/pages/index-single-entry.jsx'),
        'form-frontend': resolve(__dirname, 'assets/src/frontend/form-submit.js'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset';
          if (name.endsWith('.css')) {
            return 'assets/' + name;
          }
          return 'assets/' + name;
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
  server: {
    hmr: false,
  },
});
