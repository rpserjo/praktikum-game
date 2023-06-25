import React, { FC } from 'react';
import Button from '@components/ui/button/button';
import { useNavigate } from 'react-router-dom';
import style from './landing.module.scss';

const Landing: FC = () => {
    const navigate = useNavigate();

    return (
        <main className={style.main}>
            <div className={style.content}>
                <h1 className={style.title}>Морской бой</h1>
                <h2 className={style.subtitle}>Легендарная игра теперь в твоем браузере!</h2>
                <div className={style['figures-parent']}>
                    <figure className={style['figures-item']}>
                        <img
                            className={style['figures-item-img']}
                            src="./sprites/landing-online.svg"
                            alt="game options img"
                        />
                        <figcaption>
                            Играй с друзьями
                            <br />
                            или против ИИ
                        </figcaption>
                    </figure>
                    <figure className={style['figures-item']}>
                        <img
                            className={style['figures-item-img']}
                            src="./sprites/landing-ledder.svg"
                            alt="game options img"
                        />
                        <figcaption>
                            Следи за рейтингом
                            <br />
                            игроков
                        </figcaption>
                    </figure>
                    <figure className={style['figures-item']}>
                        <img
                            className={style['figures-item-img']}
                            src="./sprites/landing-chat.svg"
                            alt="game options img"
                        />
                        <figcaption>Общайся на форуме </figcaption>
                    </figure>
                    <figure className={style['figures-item']}>
                        <img
                            className={style['figures-item-img']}
                            src="./sprites/landing-ship.svg"
                            alt="game options img"
                        />
                        <figcaption>4 вида кораблей </figcaption>
                    </figure>
                    <figure className={style['figures-item']}>
                        <img
                            className={style['figures-item-img']}
                            src="./sprites/landing-robot-human.svg"
                            alt="game options img"
                        />
                        <figcaption>Два режима игры </figcaption>
                    </figure>
                    <figure className={style['figures-item']}>
                        <img
                            className={style['figures-item-img']}
                            src="./sprites/landing-emotions.svg"
                            alt="game options img"
                        />
                        <figcaption>Море эмоций </figcaption>
                    </figure>
                </div>
                <h3 className={style.subtitle}>Это классический морской бой.</h3>
                <ol className={style['steps-parent']}>
                    <p className={style['steps-title']}>Для того чтобы начать игру:</p>
                    <li className={style['steps-subtitle']}>
                        Выбери режим одиночной игры или онлайн
                    </li>
                    <li className={style['steps-subtitle']}>Расставь корабли на игровом поле</li>
                    <li className={style['steps-subtitle']}>Нажми кнопку “Готов к бою!”</li>
                    <li className={style['steps-subtitle']}>
                        Кликай по клеткам на поле противника, чтобы сделать выстрел
                    </li>
                </ol>

                <h3 className={style['subtitle-fight']}>Пора начать игру!</h3>

                <div className={style['button-wrap']}>
                    <Button buttonSize="medium" onClick={() => navigate('/game')}>
                        Играть одному
                    </Button>
                    <div className={style.margyncostyl} />
                    <Button type="submit" buttonSize="medium" onClick={() => navigate('/game')}>
                        Играть онлайн
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default Landing;
