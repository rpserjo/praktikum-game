import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ValidatableInput from '@/components/ui/validatableInput/validatableInput';
import Button from '@/components/ui/button/button';
import style from './loginForm.module.scss';
import AuthApi from '@/api/AuthApi';
import { RouteNames } from '@/router/router';
import { SignInData, TProfileProps } from '@/models/models';
import { RuleNames } from '@/utils/validationModels';
import { setUser } from '@/store/slices/userSlice';

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
    const authApi = new AuthApi();
    const dispatch = useDispatch();

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
        proceedCallback: () => void,
        errorCallback: (error: string) => void
    ) => {
        const data: SignInData = new SignInData(login, password);

        authApi.signin(data, proceedCallback, errorCallback);
    };

    const isFormValid = () => {
        const found = Object.values(form).find(state => !state.isValid);
        return found === undefined;
    };

    const handleLogin = () => {
        const handleUser = (userData: TProfileProps) => {
            dispatch(setUser(userData));
            proceedToGame();
        };

        authApi.getUser(handleUser);
    };

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!isFormValid()) return;
        signin(form.login.value, form.password.value, handleLogin, showError);
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
                type="password"
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
