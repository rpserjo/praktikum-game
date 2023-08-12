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
import { Icon } from '@ui';
import User, { Type } from '@components/ui/user/user';
import GameReserve from '@/pages/game/gameReserve';
import renderHorizontalText from './game.helper';
import style from './game.module.scss';
import userData from '@/mocks/data/user-data.json';
import { RootState } from '@/store';
import { GameOverReason, setGame } from '@/store/slices/gameSlice';

// todo: использование пропсов - временное решение.
//  Необходимо заменить на использование глобального состояния, когда начнем его использовать.
// enum Move {
//     user = 'user',
//     enemy = 'enemy',
// }

// 2 финальные кнопки 'победа' или 'поражение'
// 3 проверка отпускания кораблей  вобласть вокруг
// 4 рандомная генерация кораблей врага

export enum GameOver {
    win = 'win',
    defeat = 'defeat',
}

type Ship = {
    decksAmount: number;
    width: number;
    height: number;
    originLeft: number;
    originTop: number;
    currentLeft: number;
    currentTop: number;
    isRotated: boolean;
    isLoad: boolean;
    isSet: boolean;
    lives: number;
    positionSquare: Array<string>;
};
type EnemyShip = {
    decksAmount: number;
    position: Array<string>;
    width: number;
    height: number;
    lives: number;
};
type ShipsType = Array<Ship>;
type EnemyShipsType = Array<EnemyShip>;

type DataType = {
    isMousePressed: boolean;
    placeShipStep: boolean;
    shootStep: boolean;
    currentShipIndex: null | number;
    currentShip: Ship | null;
    squareSize: number;
    isDragging: boolean;
    userField: { size: number; left: number; top: number };
    enemyField: { size: number; left: number; top: number };
    enemyShots: Array<string>;
    isFinished: boolean;
};

const data: DataType = {
    isMousePressed: false,
    placeShipStep: true,
    shootStep: false,
    currentShipIndex: null,
    currentShip: null,
    squareSize: 30,
    isDragging: false,
    userField: { size: 300, left: 650, top: 70 },
    enemyField: { size: 300, left: 250, top: 70 },
    enemyShots: [],
    isFinished: false,
};

type NumsOfShipsLeftToPlaceType = {
    decks_4: number;
    decks_3: number;
    decks_2: number;
    decks_1: number;
};

const numsOfShipsLeftToPlace: NumsOfShipsLeftToPlaceType = {
    decks_4: 1,
    decks_3: 2,
    decks_2: 3,
    decks_1: 4,
};

const shipsImg: ShipsType = [
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
        isSet: false,
        lives: 4,
        positionSquare: [],
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
        isSet: false,
        lives: 3,
        positionSquare: [],
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
        isSet: false,
        lives: 3,
        positionSquare: [],
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
        isSet: false,
        lives: 2,
        positionSquare: [],
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
        isSet: false,
        lives: 2,
        positionSquare: [],
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
        isSet: false,
        lives: 2,
        positionSquare: [],
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
        isSet: false,
        lives: 1,
        positionSquare: [],
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
        isSet: false,
        lives: 1,
        positionSquare: [],
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
        isSet: false,
        lives: 1,
        positionSquare: [],
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
        isSet: false,
        lives: 1,
        positionSquare: [],
    },
];

type MissedShot = {
    x: number;
    y: number;
    place: string;
};

type succesShot = {
    x: number;
    y: number;
    place: string;
};

type MissedShotsType = Array<MissedShot>;
type SuccesShotsType = Array<succesShot>;

const missedShots: MissedShotsType = [];
const succesShots: SuccesShotsType = [];

const enemyShips: EnemyShipsType = [
    {
        decksAmount: 4,
        position: ['a1', 'b1', 'c1', 'd1'],
        width: 120,
        height: 30,
        lives: 4,
    },
    {
        decksAmount: 3,
        position: ['a3', 'a4', 'a5'],
        width: 90,
        height: 30,
        lives: 3,
    },
    {
        decksAmount: 3,
        position: ['a8', 'a9', 'a10'],
        width: 90,
        height: 30,
        lives: 3,
    },
    {
        decksAmount: 2,
        position: ['g1', 'g2'],
        width: 60,
        height: 30,
        lives: 2,
    },
    {
        decksAmount: 2,
        position: ['g4', 'g5'],
        width: 60,
        height: 30,
        lives: 2,
    },
    {
        decksAmount: 2,
        position: ['g7', 'g8'],
        width: 60,
        height: 30,
        lives: 2,
    },
    {
        decksAmount: 1,
        position: ['j1'],
        width: 30,
        height: 30,
        lives: 1,
    },
    {
        decksAmount: 1,
        position: ['j3'],
        width: 30,
        height: 30,
        lives: 1,
    },
    {
        decksAmount: 1,
        position: ['j5'],
        width: 30,
        height: 30,
        lives: 1,
    },
    {
        decksAmount: 1,
        position: ['j7'],
        width: 30,
        height: 30,
        lives: 1,
    },
];

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

const roundRect = function (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
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

const renderBattlefield = function (ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    const fieldSize = 30;
    const screenSize = 300;

    for (let index = 0; index < 10; index += 1) {
        ctx.strokeRect(x + fieldSize * index, y, fieldSize, screenSize);
        ctx.strokeRect(x, y + fieldSize * index, screenSize, fieldSize);
    }
};

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
    setEnemeWon: React.Dispatch<React.SetStateAction<boolean>>
) {
    // eslint-disable-next-line
    // await new Promise(resolve => setTimeout(resolve, 1500));

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

const clickedEnemyFieald = function (canvasX: number, canvasY: number): boolean {
    const x = data.enemyField.left;
    const xWidth = data.enemyField.left + data.enemyField.size;
    const y = data.enemyField.top;
    const yWidth = data.enemyField.top + data.enemyField.size;
    const res = canvasX >= x && canvasX <= xWidth && canvasY >= y && canvasY <= yWidth;

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
    const { game } = gameState;
    const dispatch = useDispatch();

    const [areAllShipsPlaced, setAreAllShipsPlaced] = useState(false);
    const [userTurn, setUserTurn] = useState(true);
    const [userWon, setUserWon] = useState(false);
    const [enemeWon, setEnemeWon] = useState(false);

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

        if (data.shootStep && userTurn && clickedEnemyFieald(canvasX, canvasY)) {
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

                await fakeEnemyShoot(ref, setUserTurn, setEnemeWon);
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

    const mouseUp = () => {
        if (data.isDragging && data.placeShipStep) {
            const ship = data.currentShip;

            if (isDraggedIntoDropField()) {
                if (ship !== null) {
                    if (ship.isSet === false) {
                        const key = `decks_${ship.decksAmount}` as string;
                        numsOfShipsLeftToPlace[key as keyof typeof numsOfShipsLeftToPlace] -= 1;
                    }
                    ship.isSet = true;

                    // если все корабли установили, то включаем кнопку 'готов к бою'
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

                    // записываем в дату корабля где его установили
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

    const [isFullScreen, setIsFullScreen] = useState(document.fullscreenElement !== null);

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullScreen(true));
        } else if (document.exitFullscreen) {
            document.exitFullscreen().then(() => setIsFullScreen(false));
        }
    };

    const gameStartHandle: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        dispatch(setGame({ ...game, mode: Mode.battle }));
        data.placeShipStep = false;
        data.shootStep = true;

        drawCanvasItems(ref);

        async function firstShoot() {
            await fakeEnemyShoot(ref, setUserTurn, setEnemeWon);
            drawCanvasItems(ref);
        }

        const isEnemyFirstShoot = getRandomInt(2) === 1;
        if (isEnemyFirstShoot) {
            firstShoot();
        }
    };

    const gameOverWinHandle: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        dispatch(setGame({ ...game, gameOverReason: GameOverReason.win }));
    };

    const gameDefeatWinHandle: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        dispatch(setGame({ ...game, gameOverReason: GameOverReason.defeat }));
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
