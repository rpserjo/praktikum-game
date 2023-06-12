import React, { FC, FocusEventHandler } from 'react';

import style from './textarea.module.scss';

type TextAreaProps = {
    rows: number;
    cols: number;
    label: string;
    name: string;
    placeholder?: string;
    onBlur?: FocusEventHandler;
    onFocus?: FocusEventHandler;
};
const TextArea: FC<TextAreaProps> = ({ rows, cols, name, label, placeholder, onBlur, onFocus }) => (
    <div className={style['textarea-wrapper']}>
        <label className={style.label} htmlFor={name}>
            {label}
        </label>
        <textarea
            className={style.textarea}
            rows={rows}
            cols={cols}
            onBlur={onBlur}
            onFocus={onFocus}
            name={name}
            id={name}
            placeholder={placeholder}
        />
    </div>
);
export default TextArea;
