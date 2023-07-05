import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ValidatableInput from '@/components/ui/validatableInput/validatableInput';
import Button from '@/components/ui/button/button';
import AuthApi from '@/api/AuthApi';
import { RouteNames } from '@/router/router';
import { SignUpData, TProfileProps } from '@/models/models';
import { RuleNames } from '@/utils/validationModels';
import { setUser } from '@/store/slices/userSlice';
import style from '../loginForm/loginForm.module.scss';

type FormState = {
    [key in string]: {
        value: string;
        isValid: boolean;
    };
};

const SignUpForm = () => {
    const initialState: FormState = {
        first_name: {
            value: '',
            isValid: false,
        },
        second_name: {
            value: '',
            isValid: false,
        },
        email: {
            value: '',
            isValid: false,
        },
        phone: {
            value: '',
            isValid: false,
        },
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

    const signup = (
        first_name: string,
        second_name: string,
        email: string,
        phone: string,
        login: string,
        password: string,
        proceedCallback: () => void,
        errorCallback: (error: string) => void
    ) => {
        const data: SignUpData = new SignUpData(
            first_name,
            second_name,
            email,
            phone,
            login,
            password
        );

        authApi.signup(data, proceedCallback, errorCallback);
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
        signup(
            form.first_name.value,
            form.second_name.value,
            form.email.value,
            form.phone.value,
            form.login.value,
            form.password.value,
            handleLogin,
            showError
        );
    };

    return (
        <form className={style.form}>
            <h1 className={style.form__header}>Регистрация</h1>
            <ValidatableInput
                name="first_name"
                placeholder="Имя"
                ruleType={RuleNames.NAME}
                handleChange={handleChange}
                wrapperClass={style.form__input_wrapper}
            />
            <ValidatableInput
                name="second_name"
                placeholder="Фамилия"
                ruleType={RuleNames.NAME}
                handleChange={handleChange}
                wrapperClass={style.form__input_wrapper}
            />
            <ValidatableInput
                name="email"
                placeholder="E-mail"
                ruleType={RuleNames.EMAIL}
                handleChange={handleChange}
                wrapperClass={style.form__input_wrapper}
            />
            <ValidatableInput
                name="phone"
                placeholder="Телефон"
                ruleType={RuleNames.PHONE}
                handleChange={handleChange}
                wrapperClass={style.form__input_wrapper}
            />
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
            <Button buttonSize="medium" onClick={handleSubmit}>
                Зарегистрироваться
            </Button>
            <Link className={style.form__link} to={RouteNames.SIGNIN}>
                Войти
            </Link>
        </form>
    );
};

export default SignUpForm;
