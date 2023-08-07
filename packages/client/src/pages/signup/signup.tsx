import React, { FC } from 'react';
import style from '@pages/signin/signin.module.scss';
import SignUpForm from '@components/signupForm/signupForm';
import ChangeThemeButton from '@components/ui/changeThemeButton/changeThemeButton';

const SignUp: FC = () => (
    <main className={style.main}>
        <div className={style.themeButtonContainer}>
            <ChangeThemeButton />
        </div>
        <SignUpForm />
    </main>
);

export default SignUp;
