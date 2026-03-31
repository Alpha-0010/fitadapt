import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCSS_PARTIALS = [
  '_variables.scss',
  '_mixins.scss',
  '_base.scss',
  'index.scss',
];

const stylesDir = path.resolve(__dirname, 'src/styles');

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [stylesDir],
        additionalData: (content, filepath) => {
          const isPartial = SCSS_PARTIALS.some((name) => filepath.endsWith(name));
          if (isPartial) return content;
          return `@import 'variables';\n@import 'mixins';\n${content}`;
        },
      },
    },
  },
});
