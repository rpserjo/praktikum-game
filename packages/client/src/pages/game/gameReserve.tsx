import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import style from './game.module.scss';

const GameReserve = () => {
    const navigate = useNavigate();

    const onClickButton: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        navigate('/');
    };

    return (
        <div className={style.gameReserve}>
            <div className={style.title}>Произошла ошибка!</div>

            <Button onClick={onClickButton} buttonSize="large">
                Вернуться на главную
            </Button>
        </div>
    );
};

export default GameReserve;
