export type Ship = {
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
export type EnemyShip = {
    decksAmount: number;
    position: Array<string>;
    width: number;
    height: number;
    lives: number;
};
export type ShipsType = Array<Ship>;
export type EnemyShipsType = Array<EnemyShip>;

export type DataType = {
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

export const data: DataType = {
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

export type NumsOfShipsLeftToPlaceType = {
    decks_4: number;
    decks_3: number;
    decks_2: number;
    decks_1: number;
};

export const numsOfShipsLeftToPlace: NumsOfShipsLeftToPlaceType = {
    decks_4: 1,
    decks_3: 2,
    decks_2: 3,
    decks_1: 4,
};

export const shipsImg: ShipsType = [
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

export type MissedShot = {
    x: number;
    y: number;
    place: string;
};

export type succesShot = {
    x: number;
    y: number;
    place: string;
};

export type MissedShotsType = Array<MissedShot>;
export type SuccesShotsType = Array<succesShot>;

export const missedShots: MissedShotsType = [];
export const succesShots: SuccesShotsType = [];

export const enemyShips: EnemyShipsType = [
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
