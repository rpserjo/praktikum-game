import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OAuthInPage from '@pages/oauthInPage/oauthInPage';
import HomePage from '@pages/index/index';
import GamePage from '@pages/game/game';
import LeaderboardPage from '@pages/leaderboard/leaderboard';
import ProfilePage from '@pages/profile/profile';
import SignInPage from '@pages/signin/signin';
import SignUpPage from '@pages/signup/signup';
import ErrorPage from '@pages/error/error';
import LandingPage from '@pages/landing/landing';
import ForumPage from '@/pages/forum/topicList/forumPage';
import ForumTopicPage from '@/pages/forum/topicWithComments/topicPage';
import { Loader } from '@/components/ui';
import Layout from '@/layout/default/layout';
import PrivateRoutes from '@/components/privateRoute/privateRoute';

export enum RouteNames {
    LANDING = '/',
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    OAUTH = '/oauth',
    HOME = '/home',
    GAME = '/game',
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
                <Route element={<GamePage />} path={RouteNames.GAME} />
                <Route element={<ProfilePage />} path={RouteNames.PROFILE} />
                <Route element={<LeaderboardPage />} path="/leaderboard/:page?" />
                <Route element={<ForumPage />} path="/forum/:page?" />
                <Route element={<ForumTopicPage />} path="/forum-topic/:topicId/:page?" />
            </Route>
        </Route>

        <Route element={<Layout showHeader={false} />}>
            <Route element={<LandingPage />} path={RouteNames.LANDING} />
            <Route element={<HomePage />} path={RouteNames.LANDING} />
            <Route element={<Loader />} path="/loader" />
            <Route element={<SignInPage />} path={RouteNames.SIGNIN} />
            <Route element={<OAuthInPage />} path={RouteNames.OAUTH} />
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
