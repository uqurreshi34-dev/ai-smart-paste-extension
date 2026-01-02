import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})

//base: './': Use relative paths, not absolute paths.
//It changes:
//assets/index.js into: ./assets/index.js
//Which Chrome extensions REQUIRE.

// outDir: 'dist' → Chrome loads this folder

// emptyOutDir: true → clean builds every time
