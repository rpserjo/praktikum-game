import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Loader } from '@ui';
import { Router } from '@/router/router';
import '@/assets/style.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <React.Suspense fallback={<Loader />}>
                <Router />
            </React.Suspense>
        </BrowserRouter>
    </React.StrictMode>
);
