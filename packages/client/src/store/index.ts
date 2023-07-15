import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/slices/userSlice';
import gameReducer from '@/store/slices/gameSlice';
import leaderBoardReducer from '@/store/slices/leaderBoardSlice';

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    leaderBoard: leaderBoardReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
