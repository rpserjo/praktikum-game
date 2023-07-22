import { useDispatch } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer, { TState, TUser } from '@/store/slices/userSlice';
import gameReducer from '@/store/slices/gameSlice';
import forumReducer from '@/store/slices/forumSlice';

interface IUserService {
    getUserData(): Promise<TUser>;
}
export interface StoreState {
    user: TState;
}

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    forum: forumReducer,
});

function createStore(service: IUserService, initialState?: StoreState) {
    const store = configureStore({
        reducer: rootReducer,
        // eslint-disable-next-line
        preloadedState: initialState,
        // eslint-disable-next-line
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: service,
                },
            });
        },
    });

    return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
export { createStore };
