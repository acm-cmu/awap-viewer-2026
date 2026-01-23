import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/awap-viewer-2026/',
  plugins: [react()],
  assetsInclude: ['**/*.glb']
})
