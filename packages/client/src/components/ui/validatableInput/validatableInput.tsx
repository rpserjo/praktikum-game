import React, { FC, useState } from 'react';
import style from './validatableInput.module.scss';
import ValidationService from '@/utils/validationService';
import Input from '@/components/ui/input/input';
import { RuleNames, ValidationResult } from '@/utils/validationModels';

type ValidatableInputProps = {
    name: string;
    label?: string;
    initialValue?: string;
    placeholder?: string;
    ruleType: RuleNames;
    handleChange?: (name: string, value: string, isValid: boolean) => void;
    wrapperClass?: string;
    type?: string;
};

const ValidatableInput: FC<ValidatableInputProps> = props => {
    const { name, initialValue, label, placeholder } = props;
    const { ruleType, handleChange, wrapperClass, type } = props;

    const [error, setError] = useState('');

    const onChange = (event: React.FocusEvent) => {
        const { value } = event.currentTarget as HTMLInputElement;
        const result: ValidationResult = ValidationService.validateInput(ruleType, value);
        setError(result.isValid ? '' : result.errorMessage);
        if (handleChange) {
            handleChange(name, value, result.isValid);
        }
    };

    return (
        <div className={wrapperClass}>
            <Input
                label={label}
                name={name}
                value={initialValue}
                placeholder={placeholder}
                onBlur={onChange}
                onFocus={onChange}
                type={type}
            />
            <p className={style.error} data-testid="validation-error">
                {error}
            </p>
        </div>
    );
};

export default ValidatableInput;
