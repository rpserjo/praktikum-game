import React, { FC, MouseEventHandler, ReactNode } from 'react';
import style from './button.module.scss';

type ButtonProps = {
    children: ReactNode;
    buttonSize?: 'small' | 'medium' | 'large';
    buttonStyle?: 'normal' | 'outlined';
    onClick?: MouseEventHandler;
};
const Button: FC<ButtonProps> = ({
    children,
    buttonSize = 'small',
    buttonStyle = 'normal',
    onClick,
}) => (
    <button onClick={onClick} className={`${style[buttonStyle]} ${style[buttonSize]}`}>
        {children}
    </button>
);

export default Button;
