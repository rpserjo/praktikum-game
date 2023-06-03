import React, { FC } from 'react';
import style from './canvas.module.scss';

const Game: FC = () => (
    <div className={style.gamePage}>
        <h1 className={style.title}>Одиночная игра</h1>

        <div className={style.canvasWindow}>
            <canvas width={900} height={420} />
        </div>
    </div>
);

export default Game;
