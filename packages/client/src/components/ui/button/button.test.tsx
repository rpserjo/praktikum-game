import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './button';
import userEvent from '@testing-library/user-event';

describe('Button tests', () => {
    const btnText = 'Click me';
    const handleClick = jest.fn();
    it('renders Button component', () => {
        render(<Button>{btnText}</Button>);
        expect(screen.getByText(btnText)).toBeInTheDocument();
    });

    it('checks if click handler is called', async () => {
        render(<Button onClick={handleClick}>{btnText}</Button>);
        await userEvent.click(screen.getByText(btnText));
        expect(handleClick).toHaveBeenCalled();
    });
});
