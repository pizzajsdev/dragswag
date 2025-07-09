import { type Options, defineConfig } from 'tsdown'

const config: Options = {
  entry: {
    index: './src/react/index.ts',
    core: './src/core/index.ts',
    plugins: './src/plugins/index.ts',
  },
  outDir: './dist',
  format: ['esm', 'cjs'],
  target: 'es2020',
  ignoreWatch: ['**/dist/**', '**/node_modules/**', '*.test.ts'],
  // clean: true,
  dts: true,
  sourcemap: true,
  // splitting: true, // not implemented yet. check https://github.com/rolldown/rolldown/issues/4437
  treeshake: true,
  minify: process.env['NODE_ENV'] === 'production',
  skipNodeModulesBundle: true,
  external: ['node_modules'],
}

export default defineConfig([config])
