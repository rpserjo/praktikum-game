import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ErrorMessage from '@components/ui/errorMessage/errorMessage';
import Loader from '@components/ui/loader/loader';
import style from './oauthInPage.module.scss';
import OAuthApi from '@/api/OAuthApi';
import { TProfileProps } from '@/models/models';
import { handleUser } from '@/utils/handleUser';
import AuthApi from '@/api/AuthApi';

const OAuthInPage: FC = () => {
    const [error, setError] = useState('');
    const authApi = new AuthApi();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        authApi.getUser((userData: TProfileProps) => handleUser(userData, dispatch, navigate));
    };

    const showError = (formError: string) => {
        setError(formError);
    };

    useEffect(() => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code') ?? '';
        const oAuthApi = new OAuthApi();

        const data = {
            code,
            redirect_uri: `${window.location.origin}/oauth`,
        };

        oAuthApi.oAuthIn(data, handleLogin, showError);
    }, []);

    return (
        <main className={style.main}>
            {!error ? <Loader /> : <ErrorMessage error={error} route="signin" />}
        </main>
    );
};
export default OAuthInPage;
