import { collectRoutes } from '@pizzajsdev/app-router-fs'
import { createRouterConfig } from '@pizzajsdev/app-router-fs/adapters/react-router'
import fs from 'node:fs'

function getAppRootDir() {
  const testDirs = [process.cwd() + '/app', process.cwd() + '/packages/docs/app']
  for (const dir of testDirs) {
    if (fs.existsSync(dir)) {
      return dir
    }
  }
  throw new Error('Cannot determine app root directory')
}

export const collectedRoutes = collectRoutes('routes', ['.tsx', '.ts'], getAppRootDir())
const routes = createRouterConfig(collectedRoutes)

export default routes
