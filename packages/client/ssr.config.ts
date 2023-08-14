import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@ui': path.resolve(__dirname, './src/components/ui'),
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'ssr.tsx'),
            name: 'Client',
            formats: ['cjs'],
        },
        rollupOptions: {
            output: {
                dir: 'ssr-dist',
            },
        },
    },
});
