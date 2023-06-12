import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '@components/header/header';
import style from './layout.module.scss';

type TLayoutProps = {
    showHeader?: boolean;
};

export enum Routes {
    Landing = '/',
    Signup = '/signup',
    Signin = '/signin',
    Home = '/home',
    Game = '/game',
    GameStart = '/game/start',
    GameFinish = '/game/finish',
    Profile = '/profile',
    Leaderboard = '/leaderboard',
    Forum = '/forum',
    NotFound = '/wrong-path',
    ServerErr = '/500',
}

const Layout: FC<TLayoutProps> = ({ showHeader = true }) => (
    <>
        <div className={style.wrapper}>
            {showHeader && <Header />}
            <Outlet />
        </div>

        <div className={style['bottom-links']}>
            <Link to={Routes.Landing}>Landing</Link>
            <Link to={Routes.Signup}>Sign up</Link>
            <Link to={Routes.Signin}>Sign in</Link>
            <Link to={Routes.Home}>Home</Link>
            <Link to={Routes.Game}>Game</Link>
            <Link to={Routes.GameStart}>Game start</Link>
            <Link to={Routes.GameFinish}>Game finish</Link>
            <Link to={Routes.Profile}>Profile</Link>
            <Link to={Routes.Leaderboard}>Leaderboard</Link>
            <Link to={Routes.Forum}>Forum</Link>
            <Link to={Routes.NotFound}>404</Link>
            <Link to={Routes.ServerErr}>500</Link>
        </div>
    </>
);

export default Layout;
