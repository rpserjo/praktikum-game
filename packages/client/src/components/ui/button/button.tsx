import React, { FC, ReactNode } from 'react';
import style from './button.module.scss';

type ButtonProps = {
    children: ReactNode;
    buttonSize: 'small' | 'medium' | 'large';
    buttonStyle: 'normal' | 'outlined';
};
const Button: FC<ButtonProps> = ({
    children,
    buttonSize = 'small',
    buttonStyle = 'normal',
}) => (
    <button className={`${style[buttonStyle]} ${style[buttonSize]}`}>
        {children}
    </button>
);

export default Button;
