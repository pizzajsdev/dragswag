import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    workspace: ['packages/*'],
    include: ['packages/**/*.test.ts', 'packages/**/*.test.tsx'],
    exclude: ['node_modules', 'dist', 'build', 'routes.ts'],
  },
})
