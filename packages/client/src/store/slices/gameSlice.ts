import { createSlice } from '@reduxjs/toolkit';
import { defaultShipsCount, Mode } from '@components/ui/ships/ships';

export enum GameOver {
    win = 'win',
    defeat = 'defeat',
}

enum Move {
    user = 'user',
    enemy = 'enemy',
}

export type TGame = {
    isMousePressed: boolean;
    placeShipStep: boolean;
    currentShipIndex: null | number;
    squareSize: number;
    ctxCopy: unknown;
    shipsCount: number;
    gameOver: GameOver | null;
    mode: Mode;
    move: Move;
};

type TGameState = {
    game: TGame;
};

const initialState: TGameState = {
    game: {
        isMousePressed: false,
        placeShipStep: true,
        currentShipIndex: null,
        squareSize: 30,
        ctxCopy: null,
        shipsCount: defaultShipsCount,
        gameOver: null,
        mode: Mode.placement,
        move: Move.user,
    },
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGame(state, action) {
            state.game = action.payload;
        },
    },
});

export default gameSlice.reducer;
export const { setGame } = gameSlice.actions;
