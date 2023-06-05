import React, { FC, useRef, useEffect } from 'react';
import style from './canvas.module.scss';

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            const ctx = ref.current.getContext('2d');

            // render main field
            // eslint-disable-next-line
            const roundRect = function <T extends number>(x: T, y: T, width: T, height: T, radius: T): void {
                ctx!.beginPath();
                ctx!.moveTo(x + radius, y);
                ctx!.arcTo(x + width, y, x + width, y + height, radius);
                ctx!.arcTo(x + width, y + height, x, y + height, radius);
                ctx!.arcTo(x, y + height, x, y, radius);
                ctx!.arcTo(x, y, x + width, y, radius);
                ctx!.closePath();
                ctx!.fillStyle = '#265B8F';
                ctx!.fill();
            };
            roundRect(200, 0, 800, 400, 10);

            // render battlefield
            // eslint-disable-next-line
            const renderBattlefield = function <T extends number>(x: T, y: T): void {
                ctx!.strokeStyle = 'white';
                ctx!.lineWidth = 1;

                for (let index = 0; index < 10; index += 1) {
                    ctx!.strokeRect(x + 30 * index, y, 30, 300);
                    ctx!.strokeRect(x, y + 30 * index, 300, 30);
                }
            };
            renderBattlefield(650, 70);
            renderBattlefield(250, 70);
        }
    }, []);

    return (
        <>
            <h1 className={style.title}>Одиночная игра</h1>
            <div className={style.canvasWindow}>
                <canvas ref={ref} width={1200} height={400} />
            </div>
        </>
    );
};

export default Game;
