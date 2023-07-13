import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import path from 'path';
import * as fs from 'fs';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import { createClientAndConnect } from './db';

dotenv.config({ path: '../../.env' });

console.log(process.env.SERVER_PORT);
const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
    const app = express();
    const port = Number(process.env.SERVER_PORT) || 4001;
    let vite: ViteDevServer | undefined;
    // const distPath = path.dirname(require.resolve('client/dist/index.html'));
    // const srcPath = path.dirname(require.resolve('client'));
    // const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');
    const distPath = path.resolve(__dirname, '../../client/dist');
    const srcPath = path.resolve(__dirname, '../../client');
    const ssrClientPath = path.resolve(__dirname, '../../client/ssr-dist/client.cjs');

    if (isDev()) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: srcPath,
            appType: 'custom',
        });
        app.use(vite.middlewares);
    }

    if (!isDev()) {
        app.use('/assets', express.static(path.resolve(distPath, 'assets')));
        app.use('/sprites', express.static(path.resolve(distPath, 'sprites')));
        app.use('/service-worker.js', express.static(path.resolve(distPath, 'service-worker.js')));
    }

    app.use(cors());

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
            let template: string;
            if (!isDev()) {
                template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
            } else {
                template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
                template = await vite!.transformIndexHtml(url, template);
            }

            let render: () => Promise<string>;
            if (!isDev()) {
                render = (await import(ssrClientPath)).render;
            } else {
                render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render;
            }

            const appHtml = await render();
            const html = template.replace('<!--ssr-outlet-->', appHtml);
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            if (isDev()) {
                vite!.ssrFixStacktrace(e as Error);
            }
            next(e);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });

    createClientAndConnect();
}

startServer();
