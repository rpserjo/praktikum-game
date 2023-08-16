import React, { FC, MouseEvent, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/ui/button/button';
import style from './errorMessage.module.scss';
import { RouteNames } from '@/router/router';

type TErrorMessage = {
    error: string;
    route: string;
};

const ErrorMessage: FC<TErrorMessage> = props => {
    const { error, route } = props;
    const routeName = route.toUpperCase();
    const navigate = useNavigate();

    const onClickButton: MouseEventHandler<HTMLButtonElement> = (e: MouseEvent) => {
        e.preventDefault();
        navigate(RouteNames[routeName as keyof typeof RouteNames]);
    };

    return (
        <div className={style.errorMessage}>
            <h1 className={style.errorMessageTitle}>Произошла ошибка!</h1>
            {error ? <p className={style.errorMessageText}>{error}</p> : null}

            <Button buttonSize="medium" onClick={onClickButton}>
                Вернуться
            </Button>
        </div>
    );
};

export default ErrorMessage;
