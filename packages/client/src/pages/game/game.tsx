import React, { FC, useRef, useEffect } from 'react';
import style from './canvas.module.scss';

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            const ctx = ref.current.getContext('2d');
            ctx!.fillStyle = '#265B8F';
            ctx!.fillRect(0, 0, 900, 420);
        }
    }, []);

    return (
        <>
            <h1 className={style.title}>Одиночная игра</h1>
            <div className={style.canvasWindow}>
                <canvas ref={ref} width={900} height={420} />
            </div>
        </>
    );
};

export default Game;
