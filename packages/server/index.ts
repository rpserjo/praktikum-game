import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import path from 'path';
import * as fs from 'fs';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import { YandexAPIRepository } from './repository/YandexAPIRepository';
import { dbConnect } from './db';
import { apiRouter } from './api_router';
import authService from './servises/proxy-auth-service';
import userService from './servises/user-service';

dotenv.config({ path: '../../.env' });

const isDev = () => process.env.NODE_ENV === 'development';

const distPath = path.dirname(require.resolve('client/dist/index.html'));
const srcPath = path.dirname(require.resolve('client'));
const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');

async function startServer() {
    const app = express();
    const port = Number(process.env.SERVER_PORT) || 3000;
    let vite: ViteDevServer | undefined;

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

    app.use(
        '/api/v2',
        createProxyMiddleware({
            changeOrigin: true,
            cookieDomainRewrite: {
                '*': '',
            },
            target: 'https://ya-praktikum.tech',
            selfHandleResponse: true,
            onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req) => {
                // @ts-ignore
                if (req.path === '/api/v2/auth/signin' && proxyRes.headers['set-cookie']) {
                    authService.addCookie(proxyRes.headers['set-cookie']?.toString());
                    // @ts-ignore
                } else if (req.path === '/api/v2/auth/user' && req.headers.cookie) {
                    console.log('User ', responseBuffer.toString(), 'Cook ', req.headers.cookie);
                    if (responseBuffer.toString()) {
                        userService.createUserUpdCoockie(
                            JSON.parse(responseBuffer.toString()),
                            req.headers.cookie
                        );
                    }
                }
                return responseBuffer;
            }),
        })
    );

    app.use(express.json());
    app.use('/api', apiRouter);

    app.use('*', cookieParser(), async (req, res, next) => {
        const url = req.originalUrl;
        try {
            let template: string;
            if (!isDev()) {
                template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
            } else {
                template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
                template = await vite!.transformIndexHtml(url, template);
            }

            interface SSRModule {
                render: (uri: string, repository: any) => Promise<[Record<string, any>, string]>;
            }

            let ssrModule: SSRModule;

            if (isDev()) {
                ssrModule = (await vite!.ssrLoadModule(
                    path.resolve(srcPath, 'ssr.tsx')
                )) as SSRModule;
            } else {
                ssrModule = await import(ssrClientPath);
            }

            const { render } = ssrModule;
            const [initialState, appHtml] = await render(
                url,
                new YandexAPIRepository(req.headers.cookie)
            );

            const initStateSerialized = JSON.stringify(initialState);

            const html = template
                .replace('<!--ssr-outlet-->', appHtml)
                .replace(
                    '<!--store-data-->',
                    `<script>window.initialState = ${initStateSerialized};</script>`
                );

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

    dbConnect();
}

startServer();
