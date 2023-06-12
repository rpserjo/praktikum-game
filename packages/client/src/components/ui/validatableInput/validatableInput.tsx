import React, { FC, useState } from 'react';
import style from './validatableInput.module.scss';
import ValidationService, { RuleNames, IValidationResult } from '@/utils/validationService';
import Input from '../input/input';

type ValidatableInputProps = {
    name: string;
    label?: string;
    initialValue?: string;
    placeholder?: string;
    ruleType: RuleNames;
    handleChange?: (name: string, value: string, isValid: boolean) => void;
    wrapperClass: string;
};

const ValidatableInput: FC<ValidatableInputProps> = props => {
    const { name, initialValue, label, placeholder, ruleType, handleChange, wrapperClass } = props;
    const [error, setError] = useState('');

    const onChange = (event: React.FocusEvent) => {
        const { value } = event.currentTarget as HTMLInputElement;
        const result: IValidationResult = ValidationService.validateInput(ruleType, value);
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
            />
            <p className={style.error}>{error}</p>
        </div>
    );
};

export default ValidatableInput;
