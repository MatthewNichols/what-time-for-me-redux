import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './client-side-compiled/index.js',
  output: {
    dir: null,
    file: '_site/scripts/index.bundled.js',
    format: 'iife'
  },
  plugins: [
    nodeResolve(),
    commonjs()
  ]
};