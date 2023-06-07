import React, { FC, FocusEventHandler } from 'react';

import style from './input.module.scss';

type InputProps = {
    classNameInput?: string;
    classNameWrap?: string;
    classNameLabel?: string;
    label: string;
    type?: string;
    nameElement: string;
    placeholder?: string;
    onBlur?: FocusEventHandler;
    onFocus?: FocusEventHandler;
};
const Input: FC<InputProps> = ({ type = 'text', nameElement, label, placeholder, onBlur, onFocus, classNameInput = '', classNameWrap = '', classNameLabel = '' }) => (
    <div className={`${style['input-wrapper']} ${classNameWrap}`}>
        <label className={`${style.label} ${classNameLabel}`} htmlFor={nameElement}>
            {label}
        </label>
        <input className={`${style.input} ${classNameInput}`} onBlur={onBlur} onFocus={onFocus} type={type} name={nameElement} id={nameElement} placeholder={placeholder} />
    </div>
);
export default Input;
