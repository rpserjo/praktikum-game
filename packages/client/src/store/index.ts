import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/slices/userSlice';

const rootReducer = combineReducers({
    user: userReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
