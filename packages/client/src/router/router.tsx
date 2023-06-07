import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { defaultShipsCount, Mode } from '@components/ui/ships/ships';
import { GameOver } from '@pages/game/game';
import Layout from '@/layout/default/layout';
import { Loader } from '@/components/ui';

const HomePage = lazy(() => import('@pages/index/index'));
const GamePage = lazy(() => import('@pages/game/game'));
const LeaderboardPage = lazy(() => import('@pages/leaderboard/leaderboard'));
const ProfilePage = lazy(() => import('@pages/profile/profile'));
const SignInPage = lazy(() => import('@pages/signin/signin'));
const SignUpPage = lazy(() => import('@pages/signup/signup'));
const ErrorPage = lazy(() => import('@pages/error/error'));

const Router = () => (
    <Routes>
        <Route element={<Layout />}>
            <Route element={<HomePage />} path="/home" />
            <Route element={<GamePage />} path="/game" />
            <Route
                element={<GamePage mode={Mode.placement} shipsCount={defaultShipsCount} />}
                path="/game/start"
            />
            <Route element={<GamePage gameOver={GameOver.win} />} path="/game/finish" />
            <Route element={<ProfilePage />} path="/profile" />
            <Route element={<LeaderboardPage />} path="/leaderboard/:page?" />
        </Route>

        <Route element={<Layout showHeader={false} />}>
            <Route element={<HomePage />} path="/" />
            <Route element={<Loader />} path="/loader" />
            <Route element={<SignInPage />} path="/signin" />
            <Route element={<SignUpPage />} path="/signup" />
            <Route
                element={<ErrorPage code={500} message="Что-то поломалось. Но мы уже чиним" />}
                path="/500"
            />
            <Route element={<ErrorPage />} path="*" />
        </Route>
    </Routes>
);

export default Router;
