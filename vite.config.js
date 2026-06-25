import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Proxy de /api hacia el backend Express en el puerto 3000,
// asi el frontend usa rutas relativas y evita problemas de CORS.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
