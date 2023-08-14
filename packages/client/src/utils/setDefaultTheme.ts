import { Dispatch } from '@reduxjs/toolkit';
import { changeTheme } from '@components/ui/changeThemeButton/changeThemeButton';
import { RootState } from '@/store';
import ThemeApi from '@/api/ThemeApi';

export const setDefaultTheme = async (
    state: Pick<RootState, 'user' | 'theme'>,
    dispatch: Dispatch
) => {
    const themeApi = new ThemeApi();

    // Проверяем залогинен ли пользователь
    if (state.user.user) {
        try {
            // Запрашиваем текущую тему пользователя из базы данных
            const { theme, error } = await themeApi.getCurrentUserTheme();

            if (theme) {
                changeTheme(theme.name, state, dispatch);
            } else {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        // Запрашиваем текущую тему пользователя из локального хранилища
        const currentTheme = window.localStorage.getItem('currentTheme');

        if (currentTheme) {
            changeTheme(currentTheme, state, dispatch);
        } else {
            window.localStorage.setItem('currentTheme', state.theme.theme.name);
        }
    }
};
