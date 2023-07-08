import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import startServiceWorker from './utils/service-worker/register-sw';
import '@/assets/style.scss';
import { store } from '@/store';
import App from '@/App';

ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

startServiceWorker();
