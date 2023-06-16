import { createSlice } from '@reduxjs/toolkit';

export type TUser = {
    id: number;
    login: string;
    email: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar: string | null;
};

export type TState = {
    status: string;
    user: TUser | null;
};

const initialState: TState = {
    status: 'error',
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setLogin(state, action) {
            console.log('set login');
            state!.user!.login = action.payload;
        },
    },
});

export default userSlice.reducer;
export const { setUser, setStatus, setLogin } = userSlice.actions;
