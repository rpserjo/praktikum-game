import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ValidatableInput from '../ui/validatableInput/validatableInput';
import Button from '../ui/button/button';
import { RuleNames } from '@/utils/validationService';
import MockServer from '@/mocks/mock-server';
import { Routes } from '@/layout/default/layout';
import style from './loginForm.module.scss';

type FormState = {
    [key in string]: {
        value: string;
        isValid: boolean;
    };
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
        navigate(Routes.Game);
    };

    const showError = (formError: string) => {
        setError(formError);
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
            new MockServer().signin(
                form.login.value,
                form.password.value,
                proceedToGame,
                showError
            );
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
            <Link className={style.form__link} to={Routes.Signup}>
                Зарегистрироваться
            </Link>
        </form>
    );
};

export default LoginForm;
