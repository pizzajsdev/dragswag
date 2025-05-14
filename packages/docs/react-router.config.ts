import type { Config } from '@react-router/dev/config'
import { examples } from './app/routes/examples/_list'
export default {
  // Config options...
  // To enable SPA mode we set this to `false`, otherwise it will be SSR by default
  ssr: false,
  future: {
    unstable_optimizeDeps: true,
  },
  // prerender: true,
  basename: import.meta.env['VITE_APP_BASE_PATH'],
  async prerender() {
    return ['/', '/examples', ...Object.keys(examples).map((slug) => `/examples/${slug}`)]
  },
} satisfies Config
