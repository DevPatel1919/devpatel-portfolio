import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig({
  // cloudflare() emits dist/wrangler.json so `wrangler deploy` picks up the
  // asset config in wrangler.jsonc without extra flags.
  plugins: [react(), cloudflare()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
