import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ValidatableInput from './validatableInput';
import { RuleNames } from '@/utils/validationModels';

describe('Validatable input tests', () => {
    it('renders ValidatableInput component', async () => {
        render(<ValidatableInput name="name" ruleType={RuleNames.NAME} />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    it('checks if the error message appears', async () => {
        render(<ValidatableInput name="name" ruleType={RuleNames.NAME} />);
        await userEvent.type(screen.getByRole('textbox'), 'qqq');
        userEvent.click(document.body);
        expect(screen.getByTestId('validation-error')).toBeInTheDocument();
    });
});
