import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your Express server
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS in the backend
      },
    },
  },
})
