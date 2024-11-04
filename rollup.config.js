import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";

export default {
  input: "./src/index.js",
  output: {
    file: "./dist/index.js",
    format: "umd",
    name: "usinfo",
    globals: {
      bowser: "bowser",
    },
    sourcemap: true, // Enable source maps
  },
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**", // Only transpile our source code
    }),
    terser(),
  ],
};
