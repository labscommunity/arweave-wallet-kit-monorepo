import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills"; // must be 0.17.0 to avoid shim errors
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
});
