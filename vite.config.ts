import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    define: {
      'process.env': JSON.stringify(process.env),
    },
    server: {
      port: 3000,
      host: 'localhost',
      open: true,
      cors: true,
      hmr: {
        host: 'localhost',
        port: 3000,
      },
    },
    preview: {
      port: 4173,
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: {
            'pdf-worker': ['pdfjs-dist'],
          },
        },
      },
    },
  };
});

