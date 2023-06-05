import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ui';
import style from './error.module.scss';

const ErrorPage: FC<{ code?: number; message?: string }> = ({ code = 404, message = 'Ничего не найдено' }) => {
    const navigate = useNavigate();

    return (
        <div className={style.error}>
            <div className={style.code}>{code}</div>
            <div className={style.message}>{message}</div>
            <Button buttonSize="medium" onClick={() => navigate(-1)}>
                Вернуться назад
            </Button>
        </div>
    );
};

export default ErrorPage;
