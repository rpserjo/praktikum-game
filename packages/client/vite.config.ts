import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: Number(process.env.CLIENT_PORT) || 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@ui': path.resolve(__dirname, './src/components/ui'),
        },
    },
    define: {
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
    plugins: [
        react(),
        VitePWA({
            srcDir: 'src/utils/service-worker',
            filename: 'service-worker.ts',
            strategies: 'injectManifest',
            injectRegister: false,
            manifest: false,
            injectManifest: {
                globPatterns: ['**/*.{ts,js,css,tsx,scss,woff2,png,svg,jpg,js}'],
            },
        }),
    ],
});
