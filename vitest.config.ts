import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: ['packages/*'],
    include: ['packages/**/*.test.ts', 'packages/**/*.test.tsx'],
    exclude: ['node_modules', 'dist', 'build', 'routes.ts'],
  },
})
