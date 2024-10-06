import babel from "@rollup/plugin-babel";
import typescript from '@rollup/plugin-typescript';
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import url from "@rollup/plugin-url";

import pkg from "./package.json";

export default {
  input: "src/index.tsx",
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
    typescript(),
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
