import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Loader } from '@ui';
import Router from '@/router/router';
import '@/assets/style.scss';
import { store } from '@/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <React.Suspense fallback={<Loader />}>
                    <Router />
                </React.Suspense>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
