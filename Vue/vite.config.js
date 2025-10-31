import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// This file uses the ES Module syntax (import/export) because your package.json
// is set to "type": "module", resolving the CommonJS error.
export default defineConfig({
  plugins: [
    vue(),
  ],
  // This CSS block explicitly tells Vite to use your manual PostCSS setup,
  // which is crucial for Tailwind to compile.
  css: {
    postcss: {
      config: './postcss.config.cjs',
    },
  },
})
