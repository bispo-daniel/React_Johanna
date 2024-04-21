import dotenv from 'dotenv';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import { resolve } from "path";

dotenv.config();

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: {
      key: './localhost-key.pem',
      cert: './localhost.pem',
    },
  },
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
