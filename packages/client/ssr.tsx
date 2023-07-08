import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { store } from './src/store';
import App from './src/App';

export function render() {
    return renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );
}
