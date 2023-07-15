import { createSlice } from '@reduxjs/toolkit';

export type TLeaderBoard = {
    doorsRating: number;
    email: string;
    login: string;
    lostCount: number;
    name: string;
    score: number;
    winsCount: number;
};

export type TLeaderBoards = Array<{ data: TLeaderBoard }>;

export type TLeaderBoardState = {
    leaderBoard: TLeaderBoards | null;
};

const initialState: TLeaderBoardState = {
    leaderBoard: null,
};

const leaderBoardSlice = createSlice({
    name: 'leaderBoard',
    initialState,
    reducers: {
        setLeaderBoard(state, action) {
            state.leaderBoard = action.payload;
        },
    },
});

export default leaderBoardSlice.reducer;
export const { setLeaderBoard } = leaderBoardSlice.actions;
