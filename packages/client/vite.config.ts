import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

//const path = require('path');

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
            '@ui': path.resolve(__dirname, './src/components/ui'),
        },
    },
    define: {
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
    plugins: [react()],
});
