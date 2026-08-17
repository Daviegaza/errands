import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { host: "127.0.0.1" },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("recharts") || id.includes("d3-") || id.includes("victory-vendor")) return "charts";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("react-hook-form") || id.includes("zustand")) return "state";
          return;
        },
      },
    },
  },
});
