import React, { FC, useRef, useEffect } from 'react';
import style from './canvas.module.scss';
import React, { FC, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import Button from '@components/ui/button/button';
import User, { Type } from '@components/ui/user/user';
import ErrorBoundary from '@components/errorBoundary/errorBoundary';
import Ships, { defaultShipsCount, Mode, Position } from '@components/ui/ships/ships';
import style from './game.module.scss';
import GameReserve from '@/pages/game/gameReserve';
import userData from '@/mocks/data/user-data.json';

// todo: использование пропсов - временное решение.
//  Необходимо заменить на использование глобального состояния, когда начнем его использовать.
enum Move {
    user = 'user',
    enemy = 'enemy',
}

export enum GameOver {
    win = 'win',
    defeat = 'defeat',
}

type TGame = {
    mode?: Mode;
    move?: Move;
    shipsCount?: number;
    gameOver?: GameOver;
};

const Game: FC<TGame> = props => {
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

    const {
        mode = Mode.battle,
        move = Move.user,
        shipsCount = defaultShipsCount,
        gameOver,
    } = props;
    const navigate = useNavigate();

    const handleWinButtonClick: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        navigate('/game');
    };

    const handleDefeatButtonClick: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        navigate('/game');
    };

    const endGameModalClasses = cn(style.endGameModal, {
        [style.active]: !!gameOver,
    });

    return (
        <ErrorBoundary reserveUI={<GameReserve />}>
            <div className={style.gamePage}>
                <h1 className={style.title}>Одиночная игра</h1>

                <div className={style.buttonContainer}>
                    <Button buttonSize="medium">Выйти из игры</Button>
                </div>

                <div className={style.content}>
                    <div className={style.leftSide}>
                        {mode === Mode.battle ? (
                            <>
                                <User type={Type.game} userData={userData.ai} />
                                <Ships mode={mode} position={Position.left} />
                            </>
                        ) : null}
                    </div>

                    <div className={style.middle}>
                        <div className={style.canvasWindow}>
                            <canvas ref={ref} width={1200} height={400} />
                        </div>

                        <div className={style.userInfoBlock}>
                            {mode === Mode.battle && move === Move.user ? (
                                <span className={style.gameMessage}>Ваш ход!</span>
                            ) : null}

                            {mode === Mode.battle && move === Move.enemy ? (
                                <span className={style.gameMessage}>Ход противника</span>
                            ) : null}

                            {mode === Mode.placement && shipsCount ? (
                                <span className={style.gameMessage}>Расставьте корабли</span>
                            ) : null}

                            {mode === Mode.placement && !shipsCount ? (
                                <Button buttonSize="medium">Готов к бою!</Button>
                            ) : null}
                        </div>
                    </div>

                    <div className={style.rightSide}>
                        <User type={Type.game} userData={userData.user} />
                        <Ships mode={mode} isUserShips={true} />
                    </div>
                </div>

                <div className={endGameModalClasses}>
                    <div className={style.modalContent}>
                        <div className={style.modalTitle}>
                            {gameOver === GameOver.win && 'Вы победили!'}
                            {gameOver === GameOver.defeat && 'Вы проиграли :('}
                        </div>

                        {gameOver === GameOver.win ? (
                            <Button buttonSize="large" onClick={handleWinButtonClick}>
                                Ура!
                            </Button>
                        ) : null}

                        {gameOver === GameOver.defeat ? (
                            <Button onClick={handleDefeatButtonClick} buttonSize="large">
                                Угу
                            </Button>
                        ) : null}
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default Game;
