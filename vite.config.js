import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['lucide-react', 'react-hot-toast'],
          'pdf-libs': ['jspdf', 'jspdf-autotable'],
          'html2canvas': ['html2canvas'],
        }
      }
    }
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'react-hot-toast'],
    exclude: ['jspdf', 'html2canvas']
  }
})
