import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/slices/userSlice';
import gameReducer from '@/store/slices/gameSlice';

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
