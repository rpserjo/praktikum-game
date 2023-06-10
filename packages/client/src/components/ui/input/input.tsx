import React, { FC, FocusEventHandler } from 'react';

import style from './input.module.scss';

type InputProps = {
    value?: string;
    label?: string;
    type?: string;
    nameElement: string;
    placeholder?: string;
    onBlur?: FocusEventHandler;
    onFocus?: FocusEventHandler;
    onChange?: () => Record<string, unknown> | void;
};
const Input: FC<InputProps> = ({
    value,
    type = 'text',
    nameElement,
    label,
    placeholder,
    onBlur,
    onFocus,
    onChange,
}) => (
    <div className={style['input-block']}>
        {label && (
            <label className={style.label} htmlFor={nameElement}>
                {label}
            </label>
        )}

        {!value && (
            <input
                className={style.input}
                onBlur={onBlur}
                onFocus={onFocus}
                type={type}
                name={nameElement}
                id={nameElement}
                placeholder={placeholder}
            />
        )}

        {value && onChange && (
            <input
                className={style.input}
                onBlur={onBlur}
                onFocus={onFocus}
                type={type}
                name={nameElement}
                id={nameElement}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        )}
    </div>
);
export default Input;
