import { createSlice } from '@reduxjs/toolkit';
import { defaultShipsCount, Mode } from '@components/ui/ships/ships';

export enum GameOverReason {
    win = 'win',
    defeat = 'defeat',
}

export enum Move {
    user = 'user',
    enemy = 'enemy',
}

export type TGame = {
    isMousePressed: boolean;
    isShipStepPlaceable: boolean;
    currentShipIndex: null | number;
    squareSize: number;
    ctxCopy: unknown;
    shipsCount: number;
    gameOverReason: GameOverReason | null;
    mode: Mode;
    move: Move;
};

type TGameState = {
    game: TGame;
};

const initialState: TGameState = {
    game: {
        isMousePressed: false,
        isShipStepPlaceable: true,
        currentShipIndex: null,
        squareSize: 30,
        ctxCopy: null,
        shipsCount: defaultShipsCount,
        gameOverReason: null,
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
