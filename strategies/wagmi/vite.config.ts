import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "node:path";
import { nodePolyfills } from "vite-plugin-node-polyfills"; // note must be 0.17.0 - else will get shim errors

export default defineConfig({
  plugins: [
    nodePolyfills(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@arweave-wallet-kit/wagmi-strategy",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "@arweave-wallet-kit/browser-wallet-strategy",
        "@arweave-wallet-kit/core",
        // Remove the polyfill shims from here so they get bundled.
      ],
    },
  },
});
