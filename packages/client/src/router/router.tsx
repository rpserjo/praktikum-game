import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/layouts/default/layout';
import { Loader } from '@/components/ui';

const HomePage = lazy(() => import('@pages/index/index'));
const LandingPage = lazy(() => import('@pages/landing/landing'));
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
            <Route element={<ProfilePage />} path="/profile" />
            <Route element={<LeaderboardPage />} path="/leaderboard/:page?" />
        </Route>
        <Route element={<Layout showHeader={false} />}>
            <Route element={<LandingPage />} path="/" />
            <Route element={<Loader />} path="/loader" />
            <Route element={<SignInPage />} path="/signin" />
            <Route element={<SignUpPage />} path="/signup" />
            <Route element={<ErrorPage code={500} />} path="/500" />
            <Route element={<ErrorPage />} path="*" />
        </Route>
    </Routes>
);

export default Router;
