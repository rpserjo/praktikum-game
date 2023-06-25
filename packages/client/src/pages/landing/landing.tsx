import React, { FC } from 'react';
import style from './landing.module.scss';

const Landing: FC = () => (
    <main className={style.main}>
        <div className={style.content}>
            <h1 className={style.title}>Морской бой</h1>
            <h2 className={style.subtitle}>Легендарная игра теперь в твоем браузере!</h2>
            <h3 className={style.subtitle}>Это классический морской бой.</h3>
            <h3 className={style['subtitle-fight']}>Пора начать игру!.</h3>
        </div>
    </main>
);

export default Landing;
