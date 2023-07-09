import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import startServiceWorker from './utils/service-worker/register-sw';
import '@/assets/style.scss';
import { createStore } from '@/store';
import App from '@/App';
import { UserService } from './api/UserService';
import { YandexAPIRepository } from './repository/YandexAPIRepository';

// eslint-disable-next-line
const initialState = window.initialState;

delete window.initialState;

ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <React.StrictMode>
        <Provider store={createStore(new UserService(new YandexAPIRepository()), initialState)}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

startServiceWorker();
