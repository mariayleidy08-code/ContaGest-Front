// Configuración de Vite para el front-end de ContaGest.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Necesario para abrir la app desde Codespaces
    port: 5173,
    // Redirige las peticiones /api hacia Spring Boot (puerto 8080).
    // Así el navegador cree que todo viene del mismo origen y no hace falta CORS.
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
