import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './loginForm';
import { StoreState } from '@/store';
import { UserService } from '@/api/UserService';
import { YandexAPIRepository } from '@/repository/YandexAPIRepository';
import { Provider } from 'react-redux';
import { createStore } from '@/store';

const initialState: StoreState = {
    user: {
        user: null,
        isLoaded: false,
        isLoading: false,
    },
};

describe('LoginForm tests', () => {
    it('checks that inputs are in the form', () => {
        render(
            <BrowserRouter>
                <Provider
                    store={createStore(new UserService(new YandexAPIRepository()), initialState)}
                >
                    <LoginForm />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('checks the log in button', () => {
        render(
            <BrowserRouter>
                <Provider
                    store={createStore(new UserService(new YandexAPIRepository()), initialState)}
                >
                    <LoginForm />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Войти')).toBeInTheDocument();
    });

    it('checks sign in link', () => {
        render(
            <BrowserRouter>
                <Provider
                    store={createStore(new UserService(new YandexAPIRepository()), initialState)}
                >
                    <LoginForm />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
    });
});
