import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import fs from 'node:fs'
import path from 'node:path'

import type { Plugin } from 'vite'

export function createPlatformSpecificImportPlugin(isElectron = false): Plugin {
  return {
    name: 'platform-specific-import',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!importer) {
        return null
      }

      const allowExts = ['.js', '.jsx', '.ts', '.tsx']
      if (!allowExts.some((ext) => importer.endsWith(ext))) return null

      if (importer.includes('node_modules')) return null

      const ext = path.extname(importer)
      const dir = path.dirname(importer)
      const base = path.basename(importer, ext)

      const priorities = isElectron
        ? ['.electron.ts', '.electron.tsx', '.electron.js', '.electron.jsx']
        : ['.web.ts', '.web.tsx', '.web.js', '.web.jsx']

      for (const priority of priorities) {
        const fullPath = path.join(dir, `${base}${priority}`)

        if (fs.existsSync(fullPath)) {
          console.log('fullPath', fullPath)

          return fullPath
        }
      }

      return null
    },
  }
}

export default defineConfig({
  plugins: [createPlatformSpecificImportPlugin(false)],
})
