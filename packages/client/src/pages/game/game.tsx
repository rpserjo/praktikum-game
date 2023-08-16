import React, {
    FC,
    useRef,
    useEffect,
    useState,
    MouseEventHandler,
    RefObject,
    useCallback,
} from 'react';
import Ships, { Mode, Position } from '@components/ui/ships/ships';

import ErrorBoundary from '@components/errorBoundary/errorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Button from '@components/ui/button/button';
import User, { Type } from '@components/ui/user/user';
import FullscreenButton from '@pages/game/apiButtons/fullScreenButton';
import SoundButton from '@pages/game/apiButtons/soundButton';
import GeolocationButton from '@pages/game/apiButtons/geolocationButton';
import GameReserve from '@/pages/game/gameReserve';
import renderHorizontalText, { roundRect, renderBattlefield } from './game.helper';
import {
    data,
    numsOfShipsLeftToPlace,
    shipsImg,
    succesShots,
    missedShots,
    enemyShips,
    ShipsType,
    Ship,
    EnemyShip,
} from './game.data';
import style from './game.module.scss';
import userData from '@/mocks/data/user-data.json';
import { RootState } from '@/store';
import { GameOverReason, setGame } from '@/store/slices/gameSlice';
import LeaderBoardApi from '@/api/LeaderBoardApi';
import SoundService from '@/utils/sound/soundService';

export enum GameOver {
    win = 'win',
    defeat = 'defeat',
}

function sendToLeaderBoard() {
    const userApi = new LeaderBoardApi();
    console.log(userData);

    const dataToSendOnEnd = {
        data: {
            name: userData.user.firstName,
            email: userData.user.email,
            login: 'Barbados',
            winsCount: 10,
            lostCount: 7,
            score: 87,
            doorsRating: 120,
        },
        ratingFieldName: 'doorsRating',
        teamName: 'doors',
    };

    userApi
        .postLeaderboardData(dataToSendOnEnd)
        .then((res: any) => {
            console.log('postLeaderboardData', res.status);
        })
        .catch(error => {
            console.log('postLeaderboardData error', error);
        });
}

function drawShip(ctxPassed: CanvasRenderingContext2D, ship: Ship, image: HTMLImageElement) {
    if (ship.isRotated) {
        ctxPassed.save();
        ctxPassed.translate(ship.currentLeft + ship.width / 2, ship.currentTop);

        ctxPassed.rotate(Math.PI / 2);

        ctxPassed.drawImage(image, -ship.width / 2 + 15, -ship.height / 2, ship.width, ship.height);
        ctxPassed.restore();
    } else {
        ctxPassed.drawImage(image, ship.currentLeft, ship.currentTop, ship.width, ship.height);
    }
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function drawPoint(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    size: number
) {
    const pointX = Math.round(x);
    const pointY = Math.round(y);

    context.beginPath();
    context.fillStyle = color;
    context.arc(pointX, pointY, size, 0 * Math.PI, 2 * Math.PI);
    context.fill();
}

function drawHit(context: CanvasRenderingContext2D, x: number, y: number, color: string) {
    context.font = '30px Arial';
    context.fillStyle = color;
    context.fillText('X', x, y);
}

function renderMissedShots(ctx: CanvasRenderingContext2D) {
    missedShots.forEach(shot => {
        drawPoint(ctx, shot.x, shot.y, 'white', 3);
    });
}

function renderSuccesShots(ctx: CanvasRenderingContext2D) {
    succesShots.forEach(shot => {
        drawHit(ctx, shot.x, shot.y, 'red');
    });
}

function renderShips(ctx: CanvasRenderingContext2D, shipsPictures: ShipsType) {
    if (ctx === null || ctx === undefined) {
        return;
    }

    shipsPictures.forEach(ship => {
        const image = new Image();

        image.src = `./sprites/canvasShip_${ship.decksAmount}.svg`;
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

const drawCanvasItems = async function (ref: RefObject<HTMLCanvasElement>) {
    if (ref.current) {
        const ctx = ref.current.getContext('2d');

        if (ctx === null || ctx === undefined) {
            return;
        }

        ctx.clearRect(0, 0, 1200, 400);
        // render main field
        roundRect(ctx, 200, 0, 800, 400, 10);

        renderBattlefield(ctx, 650, 70);
        renderBattlefield(ctx, 250, 70);

        // render horisontal text
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

        if (data.placeShipStep) {
            ctx.font = '32px Arial';

            const numLeft = 1175;
            const numTop = 188;
            const numHeightAdd = 59;

            Object.values(numsOfShipsLeftToPlace).forEach((value, index) => {
                ctx.fillText(String(value), numLeft, numTop + index * numHeightAdd);
            });
        }

        renderShips(ctx, shipsImg);
        renderMissedShots(ctx);
        renderSuccesShots(ctx);
    }
};

function checkUserWin(): boolean {
    const res = enemyShips.every(ship => ship.lives === 0);
    return res;
}

function checkComputerWin(): boolean {
    const res = shipsImg.every(ship => ship.lives === 0);

    return res;
}

async function fakeEnemyShoot(
    ref: RefObject<HTMLCanvasElement>,
    setUserTurn: React.Dispatch<React.SetStateAction<boolean>>,
    setEnemeWon: React.Dispatch<React.SetStateAction<boolean>>,
    isDemo = false
) {
    // eslint-disable-next-line
    await new Promise(resolve => setTimeout(resolve, getRandomInt(isDemo ? 500 : 5000)));

    let yNum = getRandomInt(10) + 1;
    let xNum = getRandomInt(10);
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    let targetSquare = letters[xNum] + yNum;

    while (data.enemyShots.includes(targetSquare)) {
        yNum = getRandomInt(10) + 1;
        xNum = getRandomInt(10);
        targetSquare = letters[xNum] + yNum;
    }

    data.enemyShots.push(targetSquare);

    const x = data.userField.left + xNum * 30 + 5;
    const y = data.userField.top + yNum * 30 - 4;

    let isHit: Ship | null = null;

    shipsImg.forEach(ship => {
        if (ship.positionSquare.includes(targetSquare)) {
            // eslint-disable-next-line
            ship.positionSquare = ship.positionSquare.filter(function (item) {
                return item !== targetSquare;
            });
            isHit = ship;
        }
    });
    console.log(targetSquare);

    if (isHit) {
        succesShots.push({ x, y, place: targetSquare });
        console.log('комп попал');
        // eslint-disable-next-line
        isHit['lives']--;
        drawCanvasItems(ref);
        if (checkComputerWin()) {
            drawCanvasItems(ref);
            console.log('Победа машин 🤖!!');
            data.shootStep = false;
            setEnemeWon(true);
        }
        setUserTurn(false);
        fakeEnemyShoot(ref, setUserTurn, setEnemeWon);
    } else {
        missedShots.push({ x: x + 10, y: y - 10, place: targetSquare });
        console.log('комп мимо');
        setUserTurn(true);
        drawCanvasItems(ref);
    }
}

const isMouseInShape = function (x: number, y: number, ship: Ship): boolean {
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

const clickedEnemyFeald = function (canvasX: number, canvasY: number): boolean {
    const x = data.enemyField.left;
    const xWidth = data.enemyField.left + data.enemyField.size;
    const y = data.enemyField.top;
    const yWidth = data.enemyField.top + data.enemyField.size;
    const res = canvasX >= x && canvasX <= xWidth && canvasY >= y && canvasY <= yWidth;

    return res;
};

const notOnOtherShip = function (): boolean {
    let res = true;

    const ship = data.currentShip;
    if (ship !== null) {
        if (ship.isRotated) {
            const yNum = Math.floor(
                Math.ceil(
                    // eslint-disable-next-line
                    ship.currentTop -
                        // eslint-disable-next-line
                        data.userField.top +
                        // eslint-disable-next-line
                        ship.height * 2 -
                        ship.width / 2
                ) / 30
            );
            const xNum = Math.floor(
                Math.floor(ship.currentLeft - data.userField.left + ship.width / 2) / 30
            );
            const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

            for (let i = 0; i < ship.decksAmount; i += 1) {
                const targetSquare = letters[xNum] + (yNum + i);
                // eslint-disable-next-line
                shipsImg.forEach(shipTocheck => {
                    shipTocheck.positionSquare.forEach(el => {
                        if (el === targetSquare) {
                            res = false;
                        }
                    });
                });
            }
        } else {
            const yNum = Math.ceil(
                Math.floor(ship.currentTop - data.userField.top + ship.height) / 30
            );
            const xNum = Math.floor(Math.floor(ship.currentLeft - data.userField.left) / 30);
            const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

            for (let i = 0; i < ship.decksAmount; i += 1) {
                const targetSquare = letters[xNum + i] + yNum;
                // eslint-disable-next-line
                shipsImg.forEach(shipTocheck => {
                    shipTocheck.positionSquare.forEach(el => {
                        if (el === targetSquare) {
                            res = false;
                        }
                    });
                });
            }
        }
    }

    return res;
};

const isDraggedIntoDropField = function (): boolean {
    let res = false;
    const ship = data.currentShip;
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

const returnShip = function (ref: RefObject<HTMLCanvasElement>): void {
    const shipToMove = data.currentShip;
    if (shipToMove !== null) {
        const animationTime = 16;
        shipToMove.isRotated = false;

        const leftStep = (shipToMove.originLeft - shipToMove.currentLeft) / animationTime;
        const topStep = (shipToMove.originTop - shipToMove.currentTop) / animationTime;

        const animate = function () {
            if (shipToMove.currentLeft !== shipToMove.originLeft) {
                shipToMove.currentLeft += leftStep;
            }
            if (shipToMove.currentTop !== shipToMove.originTop) {
                shipToMove.currentTop += topStep;
            }

            drawCanvasItems(ref);
            const leftIsDone = shipToMove.currentLeft < shipToMove.originLeft;
            const topIsDone = shipToMove.originTop < shipToMove.currentTop;

            if (leftIsDone || topIsDone) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    }
};

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);
    const gameState = useSelector((state: RootState) => state.game);
    const [soundService, setSoundService] = useState<SoundService | null>(null);
    const { game } = gameState;
    const dispatch = useDispatch();

    const [areAllShipsPlaced, setAreAllShipsPlaced] = useState(false);
    const [userTurn, setUserTurn] = useState(true);
    const [userWon, setUserWon] = useState(false);
    const [enemeWon, setEnemeWon] = useState(false);
    const [isDemo, setIsDemo] = useState(false);

    const rotate = useCallback((event: KeyboardEvent) => {
        if (data.isDragging && event.code === 'KeyR' && data.currentShip !== null) {
            if (data.currentShip.isRotated) {
                data.currentShip.isRotated = false;
                drawCanvasItems(ref);
            } else {
                data.currentShip.isRotated = true;
                drawCanvasItems(ref);
            }
        }
    }, []);

    useEffect(() => {
        drawCanvasItems(ref);
        window.addEventListener('keydown', rotate);
        setSoundService(new SoundService());
        return () => window.removeEventListener('keydown', rotate);
    }, []);

    const mouseDown = async (event: React.MouseEvent) => {
        data.isMousePressed = true;
        let canvasX = 0;
        let canvasY = 0;
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            canvasX = event.clientX - rect.left;
            canvasY = event.clientY - rect.top;
        }

        if (data.placeShipStep) {
            shipsImg.forEach((ship, i) => {
                if (isMouseInShape(canvasX, canvasY, ship)) {
                    data.currentShipIndex = i;
                    data.currentShip = shipsImg[i];
                    data.isDragging = true;
                }
            });
        }

        if (data.shootStep && userTurn && clickedEnemyFeald(canvasX, canvasY)) {
            const yNum = Math.ceil(Math.floor(canvasY - data.enemyField.top) / 30);
            const xNum = Math.floor(Math.floor(canvasX - data.enemyField.left) / 30);
            const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
            const targetSquare = letters[xNum] + yNum;

            let shipHit: EnemyShip | null = null;

            enemyShips.forEach(ship => {
                if (ship.position.includes(targetSquare)) {
                    // eslint-disable-next-line
                    ship.position = ship.position.filter(function (item) {
                        return item !== targetSquare;
                    });
                    shipHit = ship;
                }
            });

            if (shipHit === null) {
                const xShift = data.enemyField.left + xNum * 30 + 15;
                const yShift = data.enemyField.top + yNum * 30 - 15;
                missedShots.push({ x: xShift, y: yShift, place: targetSquare });

                console.log('юзер мимо');
                drawCanvasItems(ref);
                setUserTurn(false);

                await fakeEnemyShoot(ref, setUserTurn, setEnemeWon, isDemo);
                drawCanvasItems(ref);
            } else {
                console.log(shipHit);
                // eslint-disable-next-line
                shipHit['lives']--;
                // eslint-disable-next-line
                if (shipHit['lives'] === 0) {
                    console.log('юзер убил');
                } else {
                    console.log('юзер попал');
                }

                const xShift = data.enemyField.left + xNum * 30 + 5;
                const yShift = data.enemyField.top + yNum * 30 - 4;
                succesShots.push({ x: xShift, y: yShift, place: targetSquare });

                drawCanvasItems(ref);

                if (checkUserWin()) {
                    console.log('Игрок победил!!!');
                    data.shootStep = false;
                    setUserWon(true);
                }
            }
        }
    };

    const { isSoundOn } = game;

    const mouseUp = () => {
        if (data.isDragging && data.placeShipStep) {
            const ship = data.currentShip;

            if (isDraggedIntoDropField() && notOnOtherShip()) {
                isSoundOn && soundService?.playSetShipSound();

                if (ship !== null) {
                    if (ship.isSet === false) {
                        const key = `decks_${ship.decksAmount}` as string;
                        numsOfShipsLeftToPlace[key as keyof typeof numsOfShipsLeftToPlace] -= 1;
                    }
                    ship.isSet = true;

                    // if all ships are places we activate "ready for the battle" button
                    setAreAllShipsPlaced(shipsImg.every(shipInImg => shipInImg.isSet));

                    let shiftLeft;
                    let shiftTop;

                    if (ship.isRotated) {
                        shiftLeft = ((ship.currentLeft - ship.width / 2) % data.squareSize) - 5;
                        shiftTop = ((ship.currentTop + ship.width / 2) % data.squareSize) + 5;
                    } else {
                        shiftLeft = (ship.currentLeft - data.userField.left) % data.squareSize;
                        shiftTop = (ship.currentTop - data.userField.top) % data.squareSize;
                    }

                    if (shiftLeft > 15) {
                        ship.currentLeft += data.squareSize - shiftLeft;
                    } else {
                        ship.currentLeft -= shiftLeft;
                    }

                    if (shiftTop > 15) {
                        ship.currentTop += data.squareSize - shiftTop;
                    } else {
                        ship.currentTop -= shiftTop;
                    }

                    // save in ship's data it's square position
                    ship.positionSquare = [];

                    if (ship.isRotated) {
                        const yNum = Math.floor(
                            Math.ceil(
                                // eslint-disable-next-line
                                ship.currentTop -
                                    // eslint-disable-next-line
                                    data.userField.top +
                                    // eslint-disable-next-line
                                    ship.height * 2 -
                                    ship.width / 2
                            ) / 30
                        );
                        const xNum = Math.floor(
                            Math.floor(ship.currentLeft - data.userField.left + ship.width / 2) / 30
                        );
                        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

                        for (let i = 0; i < ship.decksAmount; i += 1) {
                            const targetSquare = letters[xNum] + (yNum + i);
                            ship.positionSquare.push(targetSquare);
                            console.log(targetSquare);
                        }
                    } else {
                        const yNum = Math.ceil(
                            Math.floor(ship.currentTop - data.userField.top + ship.height) / 30
                        );
                        const xNum = Math.floor(
                            Math.floor(ship.currentLeft - data.userField.left) / 30
                        );
                        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

                        for (let i = 0; i < ship.decksAmount; i += 1) {
                            const targetSquare = letters[xNum + i] + yNum;
                            ship.positionSquare.push(targetSquare);
                            console.log(targetSquare);
                        }
                    }
                    drawCanvasItems(ref);
                }
            } else {
                returnShip(ref);
                if (ship !== null) {
                    if (ship.isSet === true) {
                        const key = `decks_${ship.decksAmount}` as string;
                        numsOfShipsLeftToPlace[key as keyof typeof numsOfShipsLeftToPlace] += 1;
                    }

                    ship.isSet = false;
                    setAreAllShipsPlaced(shipsImg.every(shipInImg => shipInImg.isSet));
                }
            }
        }

        data.isMousePressed = false;
        data.currentShipIndex = null;
        data.currentShip = null;
        data.isDragging = false;
    };

    const mouseMove = (event: React.MouseEvent) => {
        if (data.isMousePressed && data.placeShipStep) {
            let canvasX = 0;
            let canvasY = 0;
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                canvasX = event.clientX - rect.left;
                canvasY = event.clientY - rect.top;
            } else {
                return;
            }

            if (data.isDragging && data.currentShipIndex !== null && data.currentShip !== null) {
                data.currentShip.currentLeft = canvasX - data.currentShip.width / 2;
                data.currentShip.currentTop = canvasY - data.currentShip.height / 2;

                drawCanvasItems(ref);
            }
        }
    };

    const { mode, gameOverReason } = game;

    const handleWinButtonClick: MouseEventHandler<HTMLButtonElement> = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        dispatch(
            setGame({
                ...game,
                gameOverReason: null,
                mode: Mode.placement,
            })
        );
        // eslint-disable-next-line
        location.reload();
    };

    const handleDefeatButtonClick: MouseEventHandler<HTMLButtonElement> = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        dispatch(
            setGame({
                ...game,
                gameOverReason: null,
                mode: Mode.placement,
            })
        );
        // eslint-disable-next-line
        location.reload();
    };

    const endGameModalClasses = cn(style.endGameModal, {
        [style.active]: !!gameOverReason,
    });

    const gameStartHandle: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        isSoundOn && soundService?.playStartSound();
        dispatch(setGame({ ...game, mode: Mode.battle }));
        data.placeShipStep = false;
        data.shootStep = true;

        drawCanvasItems(ref);

        async function firstShoot() {
            await fakeEnemyShoot(ref, setUserTurn, setEnemeWon, isDemo);
            drawCanvasItems(ref);
        }

        const isEnemyFirstShoot = getRandomInt(2) === 1;
        if (isEnemyFirstShoot) {
            firstShoot();
        }
    };

    const gameOverWinHandle: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        isSoundOn && soundService?.playWinnedSound();
        dispatch(setGame({ ...game, gameOverReason: GameOverReason.win }));
        sendToLeaderBoard();
    };

    const gameDefeatWinHandle: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        isSoundOn && soundService?.playLostSound();
        dispatch(setGame({ ...game, gameOverReason: GameOverReason.defeat }));
        sendToLeaderBoard();
    };

    return (
        <ErrorBoundary reserveUI={<GameReserve />}>
            <div className={style.gamePage}>
                <h1 className={style.title}>Одиночная игра</h1>

                <div className={style.buttonContainer}>
                    <Button buttonSize="medium">Выйти из игры</Button>
                </div>

                <FullscreenButton />
                <SoundButton />
                <GeolocationButton />
                <div style={{ position: 'absolute', left: '30px', top: '220px' }}>
                    <input type="checkbox" onChange={() => setIsDemo(!isDemo)} checked={isDemo} />
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
                            {userTurn && data.shootStep ? (
                                <span className={style.gameMessage}>Ваш ход!</span>
                            ) : null}

                            {!userTurn && data.shootStep ? (
                                <span className={style.gameMessage}>Ход противника</span>
                            ) : null}

                            {data.placeShipStep ? (
                                <span className={style.gameMessage}>Расставьте корабли</span>
                            ) : null}

                            {areAllShipsPlaced && !data.shootStep && !enemeWon && !userWon ? (
                                <Button buttonSize="medium" onClick={gameStartHandle}>
                                    Готов к бою!
                                </Button>
                            ) : null}

                            {/* todo: кнопки нужны для имитации окончания игры */}

                            {userWon || enemeWon ? (
                                <>
                                    {enemeWon ? (
                                        <div className={style.temporaryWrapperForButton}>
                                            <Button
                                                buttonSize="medium"
                                                onClick={gameDefeatWinHandle}
                                            >
                                                Поражение
                                            </Button>
                                        </div>
                                    ) : null}

                                    {userWon ? (
                                        <Button buttonSize="medium" onClick={gameOverWinHandle}>
                                            Победа
                                        </Button>
                                    ) : null}
                                </>
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
                            {gameOverReason === GameOverReason.win && 'Вы победили!'}
                            {gameOverReason === GameOverReason.defeat && 'Вы проиграли :('}
                        </div>

                        {gameOverReason === GameOverReason.win ? (
                            <Button buttonSize="large" onClick={handleWinButtonClick}>
                                Ура!
                            </Button>
                        ) : null}

                        {gameOverReason === GameOverReason.defeat ? (
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
