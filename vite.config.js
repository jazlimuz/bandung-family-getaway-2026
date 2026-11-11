import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project-site path. Keep this matching your repository name.
export default defineConfig({
  plugins: [react()],
  base: '/bandung-family-getaway-2026/',
})
