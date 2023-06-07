import React, { FC, MouseEventHandler, ReactNode } from 'react';
import style from './button.module.scss';

type ButtonProps = {
    children: ReactNode;
    buttonSize?: 'small' | 'medium' | 'large';
    buttonStyle?: 'normal' | 'outlined';
    onClick?: MouseEventHandler;
    type?: 'button' | 'submit' | 'reset' | undefined;
};
const Button: FC<ButtonProps> = ({ children, buttonSize = 'small', buttonStyle = 'normal', onClick, type }) => (
    <button onClick={onClick} type={type} className={`${style[buttonStyle]} ${style[buttonSize]}`}>
        {children}
    </button>
);

export default Button;
