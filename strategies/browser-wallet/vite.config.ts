import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "node:path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import babel from "@rollup/plugin-babel";

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
    target: "es2018",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@arweave-wallet-kit/browser-wallet-strategy",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["@arweave-wallet-kit/core", "@arweave-wallet-kit/core"],
      plugins: [
        babel({
          babelHelpers: "bundled",
          extensions: [".js", ".ts"],
          presets: [["@babel/preset-env", { targets: { esmodules: true } }]],
          exclude: "node_modules/**",
        }),
      ],
    },
  },
});
