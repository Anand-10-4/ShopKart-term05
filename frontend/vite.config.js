import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:5001';

const createProxyRule = () => ({
  target: BACKEND_URL,
  changeOrigin: true,
  secure: false,
  bypass: (req) => {
    // If browser is requesting an HTML page (direct navigation or refresh), serve index.html
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      return '/index.html';
    }
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/customers': createProxyRule(),
      '/products': createProxyRule(),
      '/wishlist': createProxyRule(),
      '/cart': createProxyRule(),
      '/orders': createProxyRule(),
    },
  },
});
