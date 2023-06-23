import React, { FC, useRef, useEffect, useState, MouseEventHandler, RefObject } from 'react';
import Ships, { defaultShipsCount, Mode, Position } from '@components/ui/ships/ships';
import ErrorBoundary from '@components/errorBoundary/errorBoundary';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import Button from '@components/ui/button/button';
import { Icon } from '@ui';
import User, { Type } from '@components/ui/user/user';
import GameReserve from '@/pages/game/gameReserve';
import renderHorizontalText from './game.helper';
import style from './game.module.scss';
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

type ship = {
    decksAmount: number;
    width: number;
    height: number;
    originLeft: number;
    originTop: number;
    currentLeft: number;
    currentTop: number;
    isRotated: boolean;
    isLoad: boolean;
};
type ships = Array<ship>;

type dataType = {
    isMoucePressed: boolean;
    placeShipStep: boolean;
    currentShipIndex: null | number;
    currnetShip: ship | null;
    squareSize: number;
    isDragging: boolean;
    userField: { size: number; left: number; top: number };
};

const data: dataType = {
    isMoucePressed: false,
    placeShipStep: true,
    currentShipIndex: null,
    currnetShip: null,
    squareSize: 30,
    isDragging: false,
    userField: { size: 300, left: 650, top: 70 },
};

const shipsImg: ships = [
    {
        decksAmount: 4,
        width: 120,
        height: 30,
        originLeft: 1030,
        originTop: 160,
        currentLeft: 1030,
        currentTop: 160,
        isRotated: false,
        isLoad: false,
    },
    {
        decksAmount: 3,
        width: 90,
        height: 30,
        originLeft: 1060,
        originTop: 220,
        currentLeft: 1060,
        currentTop: 220,
        isRotated: false,
        isLoad: false,
    },
    {
        decksAmount: 2,
        width: 60,
        height: 30,
        originLeft: 1090,
        originTop: 280,
        currentLeft: 1090,
        currentTop: 280,
        isRotated: false,
        isLoad: false,
    },
    {
        decksAmount: 1,
        width: 30,
        height: 30,
        originLeft: 1120,
        originTop: 340,
        currentLeft: 1120,
        currentTop: 340,
        isRotated: false,
        isLoad: false,
    },
];

// eslint-disable-next-line
function renderShips(ctx: CanvasRenderingContext2D, shipsImg: ships) {
    if (ctx === null || ctx === undefined) {
        return;
    }

    function drawShip(ctxPassed: CanvasRenderingContext2D, ship: ship, image: HTMLImageElement) {
        if (ship.isRotated) {
            ctxPassed.save();
            ctxPassed.translate(ship.currentLeft + ship.width / 2, ship.currentTop);

            ctxPassed.rotate(Math.PI / 2);

            ctxPassed.drawImage(
                image,
                -ship.width / 2 + 15,
                -ship.height / 2,
                ship.width,
                ship.height
            );
            ctxPassed.restore();
        } else {
            ctxPassed.drawImage(image, ship.currentLeft, ship.currentTop, ship.width, ship.height);
        }
    }

    // eslint-disable-next-line
    shipsImg.forEach((ship, i) => {
        const image = new Image();
        image.src = `./sprites/ship_${i}.svg`;
        if (!ship.isLoad) {
            image.addEventListener('load', () => {
                ship.isLoad = true;
                drawShip(ctx, ship, image);
            });
        } else {
            drawShip(ctx, ship, image);
        }
    });
}

const drawCanvasItems = function (ref: RefObject<HTMLCanvasElement>) {
    if (ref.current) {
        const ctx = ref.current.getContext('2d');

        if (ctx === null || ctx === undefined) {
            return;
        }

        ctx.clearRect(0, 0, 1200, 400);

        // render main field
        // eslint-disable-next-line
        const roundRect = function <T extends number>(
            x: T,
            y: T,
            width: T,
            height: T,
            radius: T
        ): void {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
            ctx.fillStyle = '#265B8F';
            ctx.fill();
        };
        roundRect(200, 0, 800, 400, 10);

        // render battlefield
        // eslint-disable-next-line
        const renderBattlefield = function <T extends number>(x: T, y: T): void {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            const fieldSize = 30;
            const screenSize = 300;

            for (let index = 0; index < 10; index += 1) {
                ctx.strokeRect(x + fieldSize * index, y, fieldSize, screenSize);
                ctx.strokeRect(x, y + fieldSize * index, screenSize, fieldSize);
            }
        };

        renderBattlefield(650, 70);
        renderBattlefield(250, 70);

        // render horisontal text
        // eslint-disable-next-line
        ctx.font = '19px Arial';
        ctx.fillStyle = 'white';
        const textHeight = 'A B C D E F G H I J';

        for (let i = 0; i < 2; i += 1) {
            renderHorizontalText(ctx, textHeight, 257 + 400 * i, 63, 6.6);
        }

        const top = 93;
        [...Array(2).keys()].forEach(i => {
            for (let index = 0; index < 10; index += 1) {
                let left = 233 + 400 * i;
                if (index === 9) {
                    const tenWidth = 7;
                    left -= tenWidth;
                }
                ctx.fillText(String(index + 1), left, top + data.squareSize * index);
            }
        });
        // render ships
        ctx.font = '32px Arial';

        // create ship nums
        const numLeft = 1175;
        const numTop = 188;
        const numHeightAdd = 59;

        // eslint-disable-next-line
        shipsImg.forEach((ship, i) => {
            ctx.fillText(String(ship.decksAmount), numLeft, numTop + i * numHeightAdd);
        });

        renderShips(ctx, shipsImg);
    }
};

// eslint-disable-next-line
const Game: FC<TGame> = props => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const rotate = (event: KeyboardEvent) => {
        if (data.isDragging && event.code === 'KeyR' && data.currnetShip !== null) {
            if (data.currnetShip.isRotated) {
                data.currnetShip.isRotated = false;
            } else {
                data.currnetShip.isRotated = true;
            }
        }
    };

    useEffect(() => {
        drawCanvasItems(ref);
        window.addEventListener('keydown', rotate);
    }, []);

    // eslint-disable-next-line
    const isMouseInShape = function <T extends number>(x: T, y: T, ship: ship): boolean {
        let shipLeft;
        let shipRight;
        let shipTop;
        let shipBottom;
        let res;
        if (ship.isRotated) {
            shipLeft = ship.currentLeft - 15 + ship.width / 2;
            shipRight = shipLeft + ship.height;
            shipTop = ship.currentTop + 15 - ship.width / 2;
            shipBottom = shipTop + ship.width;
            res = x > shipLeft && x < shipRight && y > shipTop && y < shipBottom;
        } else {
            shipLeft = ship.currentLeft;
            shipRight = ship.currentLeft + ship.width;
            shipTop = ship.currentTop;
            shipBottom = ship.currentTop + ship.height;
            res = x > shipLeft && x < shipRight && y > shipTop && y < shipBottom;
        }

        return res;
    };

    const mouseDown = (event: React.MouseEvent) => {
        data.isMoucePressed = true;
        let canvasX = 0;
        let canvasY = 0;
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            canvasX = event.clientX - rect.left;
            canvasY = event.clientY - rect.top;
        }

        shipsImg.forEach((ship, i) => {
            if (isMouseInShape(canvasX, canvasY, ship)) {
                data.currentShipIndex = i;
                data.currnetShip = shipsImg[i];
                data.isDragging = true;
            }
        });
    };

    const isDraggedIntoDropField = function (): boolean {
        let res = false;
        const ship = data.currnetShip;
        const x = data.userField.left;
        const xWidth = data.userField.left + data.userField.size;
        const y = data.userField.top;
        const yWidth = data.userField.top + data.userField.size;

        if (ship !== null) {
            if (ship.isRotated) {
                const shipLeft = ship.currentLeft - 15 + ship.width / 2;
                const shipRight = shipLeft + ship.height;
                const shipTop = ship.currentTop + 15 - ship.width / 2;
                const shipBottom = shipTop + ship.width;
                res = x < shipLeft && shipRight < xWidth && y < shipTop && shipBottom < yWidth;
            } else {
                const shipLeft = ship.currentLeft;
                const shipRight = ship.currentLeft + ship.width;
                const shipTop = ship.currentTop;
                const shipBottom = ship.currentTop + ship.height;
                res = x < shipLeft && shipRight < xWidth && y < shipTop && shipBottom < yWidth;
            }
        }

        return res;
    };

    const mouseUp = () => {
        if (data.isDragging) {
            if (isDraggedIntoDropField()) {
                console.log('поставили');
                //  функция смещения корабля под размер клеток
                //  запись в дату клеток занятых конкретным кораблем
            } else {
                console.log('не поставили');
                //  функция возвращения на место
            }
        }

        data.isMoucePressed = false;
        data.currentShipIndex = null;
        data.currnetShip = null;
        data.isDragging = false;
    };

    const mouseMove = (event: React.MouseEvent) => {
        if (data.isMoucePressed && data.placeShipStep) {
            let canvasX = 0;
            let canvasY = 0;
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                canvasX = event.clientX - rect.left;
                canvasY = event.clientY - rect.top;
            }

            if (data.isDragging && data.currentShipIndex !== null && data.currnetShip !== null) {
                data.currnetShip.currentLeft = canvasX - data.currnetShip.width / 2;
                data.currnetShip.currentTop = canvasY - data.currnetShip.height / 2;

                drawCanvasItems(ref);
            }
        }
    };

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

    const [isFullScreen, setIsFullScreen] = useState(document.fullscreenElement !== null);

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullScreen(true));
        } else if (document.exitFullscreen) {
            document.exitFullscreen().then(() => setIsFullScreen(false));
        }
    };

    return (
        <ErrorBoundary reserveUI={<GameReserve />}>
            <div className={style.gamePage}>
                <h1 className={style.title}>Одиночная игра</h1>

                <div className={style.buttonContainer}>
                    <Button buttonSize="medium">Выйти из игры</Button>
                </div>
                <div className={style.buttonFullscreen}>
                    <Button buttonSize="small" buttonStyle="outlined" onClick={handleFullscreen}>
                        <div
                            className={style.icon}
                            title={
                                isFullScreen
                                    ? 'Выйти из полноэкранного режима'
                                    : 'Полноэкранный режим'
                            }
                        >
                            <Icon iconName={isFullScreen ? 'exitFullScreen' : 'enterFullScreen'} />
                        </div>
                    </Button>
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
                            <canvas
                                onMouseDown={mouseDown}
                                onMouseUp={mouseUp}
                                onMouseMove={mouseMove}
                                ref={ref}
                                width={1200}
                                height={400}
                            />
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
