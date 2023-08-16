import React, { MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import ThemeApi from '@/api/ThemeApi';
import { RootState } from '@/store';
import { toggleTheme } from '@/store/slices/themeSlice';
import style from './changeThemeButton.module.scss';

export const changeTheme = (
    theme: string,
    state: Pick<RootState, 'user' | 'theme'>,
    dispatch: Dispatch
) => {
    const body = document.querySelector('body');

    if (theme === 'light') {
        body?.removeAttribute('data-theme');
        window.localStorage.setItem('currentTheme', 'light');
        dispatch(
            toggleTheme({
                ...state.theme.theme,
                name: theme,
            })
        );
    } else {
        body?.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('currentTheme', 'dark');
        dispatch(
            toggleTheme({
                ...state.theme.theme,
                name: theme,
            })
        );
    }
};

const ChangeThemeButton = () => {
    const state = useSelector((rootState: RootState) => {
        const { user, theme } = rootState;
        return { user, theme };
    });

    const dispatch = useDispatch();

    const onThemeChange: MouseEventHandler<HTMLButtonElement> = async e => {
        e.preventDefault();
        const { user, theme } = state;
        const themeApi = new ThemeApi();

        if (theme.theme.name === 'dark') {
            changeTheme('light', state, dispatch);

            if (user.user) {
                await themeApi.changeUserTheme({
                    themeName: 'light',
                    userId: user?.user?.id ?? 0,
                });
            }
        } else {
            changeTheme('dark', state, dispatch);

            if (user.user) {
                await themeApi.changeUserTheme({
                    themeName: 'dark',
                    userId: user?.user?.id ?? 0,
                });
            }
        }
    };

    return (
        <button className={style.changeThemeButton} onClick={onThemeChange}>
            <div className={style.shuttle} />
        </button>
    );
};
export default ChangeThemeButton;
