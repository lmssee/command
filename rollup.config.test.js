import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import cleanup from "rollup-plugin-cleanup";

/** 生成测试的打包配置文件 */
export default {
  input: "test/index.ts",
  output: [
    {
      format: "es",
      entryFileNames: "[name].mjs",
      preserveModules: true,
      sourcemap: false,
      exports: "named",
      dir: "test/out",
    },
  ],
  // 配置需要排除的包
  external: (id) => /^(node:)|^(tslib)|^(ismi-)/.test(id),
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({}),
    // 打包压缩，自动去注释
    // terser(),
    // 可打包 json 内容
    // 去除无用代码
    cleanup(),
  ],
};
