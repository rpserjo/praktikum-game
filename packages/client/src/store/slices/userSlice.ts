import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    isLoaded: boolean;
    isLoading: boolean;
};

const initialState: TState = {
    user: null,
    isLoaded: false,
    isLoading: false,
};
interface IUserService {
    getUserData(): Promise<TUser>;
}

const loadUser = createAsyncThunk<TUser>('root/AuthUser', async (_, thunkApi) => {
    const service: IUserService = thunkApi.extra as IUserService;
    return service.getUserData();
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(loadUser.pending, state => {
            state.isLoaded = false;
            state.isLoading = true;
        });
        builder.addCase(loadUser.rejected, state => {
            state.isLoaded = true;
            state.user = null;
            state.isLoading = false;
        });
        builder.addCase(loadUser.fulfilled, (state, action) => {
            const { payload } = action;
            state.user = payload;
            state.isLoaded = true;
            state.isLoading = false;
        });
    },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
export { loadUser };
