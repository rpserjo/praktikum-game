import React, { FC } from 'react';
import style from '@pages/signin/signin.module.scss';
import SignUpForm from '@components/signupForm/signupForm';

const SignUp: FC = () => (
    <main className={style.main}>
        <SignUpForm />
    </main>
);

export default SignUp;
