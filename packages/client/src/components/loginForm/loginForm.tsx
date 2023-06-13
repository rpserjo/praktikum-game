import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import ValidatableInput from '../ui/validatableInput/validatableInput';
import Button from '../ui/button/button';
import { RuleNames } from '@/utils/validationService';
import { RouteNames } from '@/layout/default/layout';
import style from './loginForm.module.scss';
import AuthApi, { ISignInData } from '@/api/AuthApi';

type FormState = {
    [key in string]: {
        value: string;
        isValid: boolean;
    };
};

type ErrorResponse = {
    reason: string;
};

const LoginForm = () => {
    const initialState: FormState = {
        login: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false,
        },
    };
    const [form, setForm] = useState(initialState);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (name: string, value: string, isValid: boolean) => {
        const newForm: FormState = { ...form };
        newForm[name] = { value, isValid };
        setForm(newForm);
    };

    const proceedToGame = () => {
        navigate(RouteNames.GAME);
    };

    const showError = (formError: string) => {
        setError(formError);
    };

    const signin = (
        login: string,
        password: string,
        cb: () => void,
        errorCb: (error: string) => void
    ) => {
        const data: ISignInData = { login, password };
        const authApi = new AuthApi();
        authApi
            .signin(data)
            .then(() => {
                cb();
            })
            .catch((response: AxiosError) => {
                const responseData = response.response?.data;
                const { reason } = responseData as ErrorResponse;

                if (reason === 'User already in system') {
                    cb();
                } else {
                    errorCb(reason);
                }
            });
    };

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        let isFormValid = true;
        // eslint-disable-next-line
        for (const state of Object.values(form)) {
            if (!state.isValid) {
                isFormValid = false;
                break;
            }
        }

        if (isFormValid) {
            signin(form.login.value, form.password.value, proceedToGame, showError);
        }
    };

    return (
        <form className={style.form}>
            <h1 className={style.form__header}>Авторизация</h1>
            <ValidatableInput
                name="login"
                placeholder="Логин"
                ruleType={RuleNames.LOGIN}
                handleChange={handleChange}
                wrapperClass={style.form__input_wrapper}
            />
            <ValidatableInput
                name="password"
                placeholder="Пароль"
                ruleType={RuleNames.PASSWORD}
                handleChange={handleChange}
                wrapperClass={style.form__input_wrapper}
            />
            <p className={style.form__error}>{error}</p>
            <Button buttonSize="large" onClick={handleSubmit}>
                Войти
            </Button>
            <Link className={style.form__link} to={RouteNames.SIGNUP}>
                Зарегистрироваться
            </Link>
        </form>
    );
};

export default LoginForm;
