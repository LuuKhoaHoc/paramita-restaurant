import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  output: {
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react/jsx-runtime': 'jsxRuntime'
    }
  },
  publicDir: 'public',
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  }
})
