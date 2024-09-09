import { defineConfig } from "vite";
import { resolve } from "path";
// import chalk from "chalk";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "/src/index.js"),
      name: "uaInfo",
      fileName: "uaInfo",
    },
  },
});
