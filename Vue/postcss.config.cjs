import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  css: {
    postcss: {
      config: './postcss.config.cjs', // Must point to the CJS file
    },
  },
})
