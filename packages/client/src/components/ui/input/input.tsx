import React, { FC, FocusEventHandler } from 'react';

import style from './input.module.scss';

type InputProps = {
    value?: string;
    label?: string;
    type?: string;
    name: string;
    placeholder?: string;
    onBlur?: FocusEventHandler;
    onFocus?: FocusEventHandler;
    onChange?: () => Record<string, unknown> | void;
};
const Input: FC<InputProps> = ({
    value,
    type = 'text',
    name,
    label,
    placeholder,
    onBlur,
    onFocus,
    onChange,
}) => (
    <div className={style['input-block']}>
        {label && (
            <label className={style.label} htmlFor={name}>
                {label}
            </label>
        )}

        {!value && (
            <input
                className={style.input}
                onBlur={onBlur}
                onFocus={onFocus}
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
            />
        )}

        {value && onChange && (
            <input
                className={style.input}
                onBlur={onBlur}
                onFocus={onFocus}
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        )}
    </div>
);
export default Input;
