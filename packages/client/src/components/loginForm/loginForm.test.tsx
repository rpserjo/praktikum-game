import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './loginForm';

describe('LoginForm tests', () => {
    it('checks that inputs are in the form', () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('checks the log in button', () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        expect(screen.getByText('Войти')).toBeInTheDocument();
    });

    it('checks sign in link', () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
    });
});
