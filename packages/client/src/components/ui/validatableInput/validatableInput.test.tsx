import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ValidatableInput from './validatableInput';
import { RuleNames } from '@/utils/validationModels';

// check if entered value is validated by right rule
// check if invalid value returns with error
describe('Validatable input tests', () => {
    it('renders ValidatableInput component', () => {
        render(<ValidatableInput name="name" ruleType={RuleNames.NAME} />);
        //expect(screen.getByText(btnText)).toBeInTheDocument();
    });
});
