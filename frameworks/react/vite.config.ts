import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import react from "@vitejs/plugin-react";
import banner from "vite-plugin-banner";
import { defineConfig } from "vite";
import wyw from "@wyw-in-js/vite";
import dts from "vite-plugin-dts";
import path from "node:path";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";

export default defineConfig({
  plugins: [
    wyw({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
    react(),
    dts({ insertTypesEntry: true }),
    cssInjectedByJsPlugin(),
    banner({
      content: '"use client";',
      verify: false,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@arweave-wallet-kit/react",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        /^@arweave-wallet-kit\/styles\/.*/,
        "react/jsx-runtime",
      ],
      output: {
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
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: false, // Enable sourcemaps for better debugging by library users
    minify: false, // Minify the output
  },
});
