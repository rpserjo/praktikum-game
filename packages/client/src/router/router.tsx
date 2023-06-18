import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { defaultShipsCount, Mode } from '@/components/ui/ships/ships';
import { GameOver } from '@/pages/game/game';
import Layout from '@/layout/default/layout';
import { Loader } from '@/components/ui';
import PrivateRoutes from '@/components/privateRoute/privateRoute';

const HomePage = lazy(() => import('@pages/index/index'));
const GamePage = lazy(() => import('@pages/game/game'));
const LeaderboardPage = lazy(() => import('@pages/leaderboard/leaderboard'));
const ProfilePage = lazy(() => import('@pages/profile/profile'));
const SignInPage = lazy(() => import('@pages/signin/signin'));
const SignUpPage = lazy(() => import('@pages/signup/signup'));
const ErrorPage = lazy(() => import('@pages/error/error'));
const ForumPage = lazy(() => import('@pages/forum/dataLoader/dataLoader'));
const ForumTopicPage = lazy(() => import('@pages/forum-topic/forum-topic'));

export enum RouteNames {
    LANDING = '/',
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    HOME = '/home',
    GAME = '/game',
    GAME_START = '/game/start',
    GAME_FINISH = '/game/finish',
    PROFILE = '/profile',
    PROFILE_EDIT = '/profile/edit',
    PROFILE_PASSWORD = '/profile/password',
    LEADERBOARD = '/leaderboard',
    FORUM = '/forum',
    NOT_FOUND = '/wrong-path',
    SERVER_ERROR = '/500',
}

const Router = () => (
    <Routes>
        <Route element={<Layout />}>
            <Route element={<PrivateRoutes />}>
                <Route element={<HomePage />} path="/home" />
                <Route path={RouteNames.GAME} element={<GamePage />} />
                <Route
                    element={<GamePage mode={Mode.placement} shipsCount={defaultShipsCount} />}
                    path={RouteNames.GAME_START}
                />
                <Route
                    element={<GamePage gameOver={GameOver.win} />}
                    path={RouteNames.GAME_FINISH}
                />
                <Route element={<ProfilePage />} path={RouteNames.PROFILE} />
                <Route element={<LeaderboardPage />} path="/leaderboard/:page?" />
                <Route element={<ForumPage />} path="/forum/:page?" />
                <Route element={<ForumTopicPage />} path="/forum-topic/:topicId/:page?" />
            </Route>
        </Route>

        <Route element={<Layout showHeader={false} />}>
            <Route element={<HomePage />} path={RouteNames.LANDING} />
            <Route element={<Loader />} path="/loader" />
            <Route element={<SignInPage />} path={RouteNames.SIGNIN} />
            <Route element={<SignUpPage />} path={RouteNames.SIGNUP} />
            <Route element={<ProfilePage section="edit" />} path={RouteNames.PROFILE_EDIT} />
            <Route
                element={<ProfilePage section="password" />}
                path={RouteNames.PROFILE_PASSWORD}
            />
            <Route
                element={<ErrorPage code={500} message="Что-то поломалось. Но мы уже чиним" />}
                path="/500"
            />
            <Route element={<ErrorPage />} path="*" />
        </Route>
    </Routes>
);

export default Router;
