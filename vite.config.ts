import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    // @/ = src/, zodat imports niet afhangen van hoe diep een bestand zit
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
