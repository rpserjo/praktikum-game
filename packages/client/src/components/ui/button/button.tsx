import React, { FC, MouseEventHandler, ReactNode } from 'react';
import style from './button.module.scss';

type ButtonProps = {
    children: ReactNode;
    buttonSize?: 'small' | 'medium' | 'large';
    buttonStyle?: 'normal' | 'outlined';
    onClick?: MouseEventHandler;
    type?: 'submit' | 'reset' | 'button';
};
const Button: FC<ButtonProps> = ({
    children,
    buttonSize = 'small',
    buttonStyle = 'normal',
    onClick,
    type = 'button',
}) => (
    <button onClick={onClick} className={`${style[buttonStyle]} ${style[buttonSize]}`} type={type}>
        {children}
    </button>
);

export default Button;
