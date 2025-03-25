import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@contexts": "/src/contexts",
      "@components": "/src/components", // Add this line
    },
  },
  plugins: [react()],
});
