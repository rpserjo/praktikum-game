import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout';
import ErrorPage from '../pages/error/error';
import Index from '../pages/index';
import SignUp from '../pages/signup/signup';
import SignIn from '../pages/signin/signin';
import Game from '../pages/game/game';
import Profile from '../pages/profile/profile';
import Leaderboard from '../pages/leaderboard/leaderboard';

// eslint-disable-next-line
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Index />,
            },
            {
                path: 'signup',
                element: <SignUp />,
            },
            {
                path: 'signin',
                element: <SignIn />,
            },
            {
                path: 'game',
                element: <Game />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'leaderboard/:page',
                element: <Leaderboard />,
            },
        ],
    },
]);
