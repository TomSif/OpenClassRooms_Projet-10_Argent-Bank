import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: "public", // Explicite le dossier public
  base: "/", // Définit la base pour les assets
  server: {
    fs: {
      strict: false,
    },
  },
});
