import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize build for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          utils: ['axios', 'dayjs'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
})
