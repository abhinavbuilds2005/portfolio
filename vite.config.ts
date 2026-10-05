import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.md'],
  server: {
    port: 3000,
    open: false,
    watch: {
      usePolling: true,
      interval: 1000,
      ignored: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.pdf', '**/dist/**', '**/.git/**']
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
});
