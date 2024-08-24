import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";

import pkg from "./package.json";

export default {
  input: "src/index.jsx",
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
    postcss({
      modules: true,
    }),
    url(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
  ],
};
