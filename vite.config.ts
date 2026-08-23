import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [tanstackRouter(), react(), tailwindcss()],
  appType: 'spa',
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
})
