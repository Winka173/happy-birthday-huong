import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["gsap", "framer-motion", "@react-spring/web", "canvas-confetti"],
  },
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          animations: ["framer-motion", "@react-spring/web", "gsap"],
          ui: ["lucide-react", "canvas-confetti"],
        },
      },
    },
  },
});
