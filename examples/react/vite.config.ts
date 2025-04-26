import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills({
      globals: {
        process: true,
        Buffer: false,
        global: false,
      },
    }),
    react(),
  ],
  build: {
    rollupOptions: {
      external: ["vite-plugin-node-polyfills/shims/process"],
    },
  },
});
