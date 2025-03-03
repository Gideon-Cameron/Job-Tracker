import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [react(), compression()],
  build: {
    assetsInlineLimit: 4096, // ✅ Keep assets under 4KB inline to reduce requests
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // ✅ Separate vendor files for better caching
          }
        },
      },
    },
  },
});
