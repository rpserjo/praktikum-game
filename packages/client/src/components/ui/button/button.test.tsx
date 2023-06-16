import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './button';

describe('Button tests', () => {
    const btnText = 'Click me';
    const handleClick = () => {};
    it('renders Button component', () => {
        render(<Button>{btnText}</Button>);
        expect(screen.getByText(btnText)).toBeInTheDocument();
    });

    it('checks if click handler is called', () => {
        render(<Button onClick={handleClick}>{btnText}</Button>);
        //click
        //test clicked
    });
});
