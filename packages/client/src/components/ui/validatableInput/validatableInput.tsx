import React, { FC, useState } from 'react';
import style from './validatableInput.module.scss';
import ValidationService, { RuleNames, IValidationResult } from '@/utils/validationService';
import Input from '../input/input';

type ValidatableInputProps = {
    name: string;
    placeholder: string;
    type: RuleNames;
    handleChange?: (name: string, value: string, isValid: boolean) => void;
    inputClass: string;
    wrapperClass: string;
};

const ValidatableInput: FC<ValidatableInputProps> = props => {
    const { name, placeholder, type, handleChange, inputClass, wrapperClass } = props;
    const [error, setError] = useState('');

    const onChange = (event: React.FocusEvent) => {
        const { value } = event.currentTarget as HTMLInputElement;
        const result: IValidationResult = ValidationService.validateInput(type, value);
        setError(result.isValid ? '' : result.errorMessage);
        if (handleChange) {
            handleChange(name, value, result.isValid);
        }
    };

    return (
        <div className={wrapperClass}>
            <Input label="" nameElement={name} placeholder={placeholder} classNameInput={inputClass} onBlur={onChange} onFocus={onChange} />
            <p className={style.error}>{error}</p>
        </div>
    );
};

export default ValidatableInput;
