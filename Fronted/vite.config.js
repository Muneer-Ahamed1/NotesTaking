import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';



export default defineConfig({
  plugins: [react()],

  server: {
    port: 5000,  // Specify the port for Vite dev server
   
  },
});
