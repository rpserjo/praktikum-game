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
    user: TUser | null;
};

const initialState: TState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
