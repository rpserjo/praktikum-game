import React, { FC } from 'react';
import { LoginForm } from '@/components/loginForm/loginForm';
import style from './signin.module.scss';

const SignIn: FC = () => (
    <main className={style.main}>
        <LoginForm />
    </main>
);

export default SignIn;
