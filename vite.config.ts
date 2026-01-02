import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        background: resolve(__dirname, 'src/background.ts'),
        content: resolve(__dirname, 'src/content.ts')
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === 'background') return 'background.js'
          if (chunk.name === 'content') return 'content.js'
          return 'assets/[name]-[hash].js'
        }
      }
    },
  }
})

//base: './': Use relative paths, not absolute paths.
//It changes:
//assets/index.js into: ./assets/index.js
//Which Chrome extensions REQUIRE.

// outDir: 'dist' → Chrome loads this folder

// emptyOutDir: true → clean builds every time
