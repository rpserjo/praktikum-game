import { createSlice } from '@reduxjs/toolkit';

export type TTheme = {
    name: string;
    description: string;
};

type TThemeState = {
    theme: TTheme;
};

const initialState: TThemeState = {
    theme: {
        name: 'light',
        description: '',
    },
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state, action) {
            state.theme = action.payload;
        },
    },
});

export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;
