import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

/** 生成测试的打包配置文件 */
export default {
  input: 'test/index.ts',
  output: [
    {
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'test/out',
    },
  ],
  // 配置需要排除的包
  external: id => /^(node:)|^(tslib)|^(ismi-)/.test(id),
  plugins: [resolve(), commonjs(), json(), typescript({})],
};
