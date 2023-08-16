import { NavigateFunction } from 'react-router-dom';
import { Action, Dispatch } from '@reduxjs/toolkit';
import { RouteNames } from '@/router/router';
import { setUser } from '@/store/slices/userSlice';
import { TProfileProps } from '@/models/models';

export const handleUser = (
    userData: TProfileProps,
    dispatch: Dispatch<Action>,
    navigate: NavigateFunction
) => {
    dispatch(setUser(userData));
    navigate(RouteNames.GAME);
};
