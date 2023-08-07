import React, { FC, MouseEventHandler, ReactNode } from 'react';
import style from './button.module.scss';

type ButtonProps = {
    children: ReactNode;
    buttonSize?: 'small' | 'medium' | 'large' | 'no';
    buttonStyle?: 'normal' | 'outlined' | 'outlinedSmall';
    onClick?: MouseEventHandler;
    type?: 'button' | 'submit' | 'reset';
};
const Button: FC<ButtonProps> = ({
    children,
    buttonSize = 'small',
    buttonStyle = 'normal',
    onClick,
    type = 'button',
}) => (
    <button onClick={onClick} type={type} className={`${style[buttonStyle]} ${style[buttonSize]}`}>
        {children}
    </button>
);

export default Button;
