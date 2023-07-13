import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './loginForm';

import { Provider } from 'react-redux';
import { store } from '@/store';

describe('LoginForm tests', () => {
    it('checks that inputs are in the form', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <LoginForm />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('checks the log in button', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <LoginForm />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Войти')).toBeInTheDocument();
    });

    it('checks sign in link', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <LoginForm />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
    });
});
