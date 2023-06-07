import React, { FC, FocusEventHandler } from 'react';

import style from './textarea.module.scss';

type TextAreaProps = {
    rows: number;
    cols: number;
    label: string;
    nameElement: string;
    placeholder?: string;
    onBlur?: FocusEventHandler;
    onFocus?: FocusEventHandler;
};
const TextArea: FC<TextAreaProps> = ({ rows, cols, nameElement, label, placeholder, onBlur, onFocus }) => (
    <div className={style['textarea-wrapper']}>
        <label className={style.label} htmlFor={nameElement}>
            {label}
        </label>
        <textarea className={style.textarea} rows={rows} cols={cols} onBlur={onBlur} onFocus={onFocus} name={nameElement} id={nameElement} placeholder={placeholder} />
    </div>
);
export default TextArea;
