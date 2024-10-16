import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "node:path";

export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true })
  ],
  build: {
    lib: {
      entry: {
        strategy: path.resolve(__dirname, "src/strategy/index.ts"),
        wallet: path.resolve(__dirname, "src/wallet/index.ts"),
        theme: path.resolve(__dirname, "src/theme/index.ts"),
        config: path.resolve(__dirname, "src/config/index.ts")
      },
      name: "@arweave-wallet-kit/core",
      formats: ["es", "cjs"],
      fileName: (format, entryName) => `${entryName}.${format}.js`
    }
  }
});
