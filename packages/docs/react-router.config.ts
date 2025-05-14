import type { Config } from '@react-router/dev/config'

export default {
  // Config options...
  // To enable SPA mode we set this to `false`, otherwise it will be SSR by default
  ssr: false,
  future: {
    unstable_optimizeDeps: true,
  },
  // prerender: true,
  basename: import.meta.env['VITE_APP_BASE_PATH'],
} satisfies Config
