import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "node:path";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    nodePolyfills({
      globals: {
        Buffer: false,
        global: false,
        process: false,
      },
    }),
    dts({
      insertTypesEntry: true,
      exclude: ["**/node_modules/**", "**/dist/**"],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@arweave-wallet-kit/browser-wallet-strategy",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["@arweave-wallet-kit/core", "@arweave-wallet-kit/core"],
    },
  },
});
