import { defineConfig } from 'tsup';
import cssModulesPlugin from 'esbuild-css-modules-plugin';

export default defineConfig({
  entry: ['src/index.tsx', 'src/future/index.tsx'],
  format: ['cjs', 'esm'],
  external: ['react', 'react-dom'],
  bundle: true,
  clean: true,
  dts: true,
  esbuildPlugins: [cssModulesPlugin()],
});
