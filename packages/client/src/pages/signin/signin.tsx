import React, { FC } from 'react';
import ChangeThemeButton from '@components/ui/changeThemeButton/changeThemeButton';
import LoginForm from '@/components/loginForm/loginForm';
import style from './signin.module.scss';

const SignIn: FC = () => (
    <main className={style.main}>
        <div className={style.themeButtonContainer}>
            <ChangeThemeButton />
        </div>
        <LoginForm />
    </main>
);

export default SignIn;
