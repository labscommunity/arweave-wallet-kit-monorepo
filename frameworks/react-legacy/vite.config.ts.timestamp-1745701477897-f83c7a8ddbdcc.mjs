// vite.config.ts
import react from "file:///Users/atticus/Documents/code/arweave-wallet-kit/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@4.5.9_@types+node@18.19.75_sass@1.84.0_terser@5.39.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/atticus/Documents/code/arweave-wallet-kit/node_modules/.pnpm/vite@4.5.9_@types+node@18.19.75_sass@1.84.0_terser@5.39.0/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/atticus/Documents/code/arweave-wallet-kit/node_modules/.pnpm/vite-plugin-dts@1.7.3_@types+node@18.19.75_rollup@4.34.6_vite@4.5.9_@types+node@18.19.75_sass@1.84.0_terser@5.39.0_/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "node:path";
import cssInjectedByJsPlugin from "file:///Users/atticus/Documents/code/arweave-wallet-kit/node_modules/.pnpm/vite-plugin-css-injected-by-js@3.5.2_vite@4.5.9_@types+node@18.19.75_sass@1.84.0_terser@5.39.0_/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
var __vite_injected_original_dirname = "/Users/atticus/Documents/code/arweave-wallet-kit/frameworks/react-legacy";
var vite_config_default = defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true }), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "arweave-wallet-kit",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "arweave", "@othent/kms"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYXR0aWN1cy9Eb2N1bWVudHMvY29kZS9hcndlYXZlLXdhbGxldC1raXQvZnJhbWV3b3Jrcy9yZWFjdC1sZWdhY3lcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hdHRpY3VzL0RvY3VtZW50cy9jb2RlL2Fyd2VhdmUtd2FsbGV0LWtpdC9mcmFtZXdvcmtzL3JlYWN0LWxlZ2FjeS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYXR0aWN1cy9Eb2N1bWVudHMvY29kZS9hcndlYXZlLXdhbGxldC1raXQvZnJhbWV3b3Jrcy9yZWFjdC1sZWdhY3kvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1jc3MtaW5qZWN0ZWQtYnktanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIGR0cyh7IGluc2VydFR5cGVzRW50cnk6IHRydWUgfSksIGNzc0luamVjdGVkQnlKc1BsdWdpbigpXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9pbmRleC50c1wiKSxcbiAgICAgIG5hbWU6IFwiYXJ3ZWF2ZS13YWxsZXQta2l0XCIsXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiLCBcInVtZFwiXSxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgaW5kZXguJHtmb3JtYXR9LmpzYCxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiLCBcImFyd2VhdmVcIiwgXCJAb3RoZW50L2ttc1wiXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgcmVhY3Q6IFwiUmVhY3RcIixcbiAgICAgICAgICBcInJlYWN0LWRvbVwiOiBcIlJlYWN0RE9NXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFksT0FBTyxXQUFXO0FBQzVaLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsT0FBTywyQkFBMkI7QUFKbEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUUsa0JBQWtCLEtBQUssQ0FBQyxHQUFHLHNCQUFzQixDQUFDO0FBQUEsRUFDM0UsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQzdDLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNyQixVQUFVLENBQUMsV0FBVyxTQUFTLE1BQU07QUFBQSxJQUN2QztBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFNBQVMsYUFBYSxXQUFXLGFBQWE7QUFBQSxNQUN6RCxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
