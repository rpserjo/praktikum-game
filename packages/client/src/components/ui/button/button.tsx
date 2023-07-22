import React, { FC, MouseEventHandler, ReactNode } from 'react';
import style from './button.module.scss';

type ButtonProps = {
    children: ReactNode;
    buttonSize?: 'small' | 'medium' | 'large';
    buttonStyle?: 'normal' | 'outlined';
    onClick?: MouseEventHandler;
    type?: 'button' | 'submit' | 'reset';
    customStyle?: string;
};
const Button: FC<ButtonProps> = ({
    children,
    buttonSize = 'small',
    buttonStyle = 'normal',
    customStyle = '',
    onClick,
    type = 'button',
}) => (
    <button
        onClick={onClick}
        type={type}
        className={`${style[buttonStyle]} ${style[buttonSize]} ${customStyle}`}
    >
        {children}
    </button>
);

export default Button;
