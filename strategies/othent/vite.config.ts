import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "node:path";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
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
    dts({ insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@arweave-wallet-kit/othent-strategy",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["@arweave-wallet-kit/core"],
      plugins: [
        /**
         * Running Babel on the generated code:
         *  https://github.com/rollup/plugins/blob/master/packages/babel/README.md#running-babel-on-the-generated-code
         *
         * Transforming ES6+ syntax to ES5 is not supported yet, there are two ways to do:
         *  https://github.com/evanw/esbuild/issues/1010#issuecomment-803865232
         * We choose to run Babel on the output files after esbuild.
         *
         * @vitejs/plugin-legacy does not support library mode:
         *  https://github.com/vitejs/vite/issues/1639
         */
        getBabelOutputPlugin({
          allowAllFormats: true,
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead, IE 11",
                useBuiltIns: false, // Default：false
                // // https://babeljs.io/docs/en/babel-preset-env#modules
                modules: false,
              },
            ],
          ],
        }),
      ],
    },
    sourcemap: false, // Enable sourcemaps for better debugging by library users
    minify: false, // Minify the output
  },
});
