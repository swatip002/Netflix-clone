import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   esbuild: {
    loader: 'jsx',  // Explicitly treat .jsx files as JSX
     include: /src\/.*\.jsx?$/,  // Only apply to .js/.jsx files in src
   }
})
