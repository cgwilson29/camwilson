import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this repo at /camwilson/. Change to '/' if the repo is
// renamed to <username>.github.io or a custom domain is used.
export default defineConfig({
  base: '/camwilson/',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1000 }, // three.js chunk is lazy-loaded
});
