import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { createStore, AppDispatch } from './src/store';
import App from './src/App';
import { UserService } from './src/api/UserService';
import { loadUser } from './src/store/slices/userSlice';
import ErrorBoundary from './src/components/errorBoundary/errorBoundary';
import { Loader } from './src/components/ui';

export async function render(uri, repository) {
    const store = createStore(new UserService(repository));

    const loader = (dispatch: AppDispatch) => dispatch(loadUser());

    await loader(store.dispatch);

    const initialState = store.getState();
    const renderResult = renderToString(
        <StaticRouter location={uri}>
            <Provider store={store}>
                <ErrorBoundary reserveUI={<Loader />}>
                    <App />
                </ErrorBoundary>
            </Provider>
        </StaticRouter>
    );
    return [initialState, renderResult];
}
