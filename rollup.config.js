import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";

import pkg from "./package.json";

export default {
  input: "src/index.js",
  external: ["react"],
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      globals: {
        react: "React",
      },
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
      globals: {
        react: "React",
      },
    },
    {
      file: pkg.browser,
      format: "umd",
      name: "react-json-grid",
      sourcemap: true,
      globals: {
        react: "React",
      },
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    url(),
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"],
    }),
    resolve(),
    commonjs(),
  ],
};
