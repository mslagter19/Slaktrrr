import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  //base: '/Slagvast/',
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
})
