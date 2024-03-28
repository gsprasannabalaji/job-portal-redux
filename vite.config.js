import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { nodeAddonPlugin } from 'vite-node-addon';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps: {
  //   esbuildOptions: {
  //     loader: {
  //       '.node': 'node-addon-loader',
  //     },
  //   },
  // },
})
