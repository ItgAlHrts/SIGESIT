import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5175,        // sesuaikan dengan port kamu sekarang
    strictPort: true,
    cors: true,
    allowedHosts: true // 🔥 wajib untuk ngrok
  }
})