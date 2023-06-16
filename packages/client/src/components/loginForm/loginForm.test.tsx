import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './loginForm';

describe('LoginForm tests', () => {
    it('renders LoginForm component', () => {
        render(<LoginForm />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
});
