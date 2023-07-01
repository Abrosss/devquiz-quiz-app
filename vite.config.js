import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const viteEnv = {};
Object.keys(process.env).forEach((key) => {
  if (key.startsWith(`VITE_`)) {
    viteEnv[`import.meta.env.${key}`] = process.env[key];
  }
});
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  define: viteEnv
})
