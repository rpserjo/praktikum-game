import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '@components/header/header';
import style from './layout.module.scss';

type TLayoutProps = {
    showHeader?: boolean;
};

enum Route {
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
            <Link to={Route.Landing}>Landing</Link>
            <Link to={Route.Signup}>Sign up</Link>
            <Link to={Route.Signin}>Sign in</Link>
            <Link to={Route.Home}>Home</Link>
            <Link to={Route.Game}>Game</Link>
            <Link to={Route.GameStart}>Game start</Link>
            <Link to={Route.GameFinish}>Game finish</Link>
            <Link to={Route.Profile}>Profile</Link>
            <Link to={Route.Leaderboard}>Leaderboard</Link>
            <Link to={Route.Forum}>Forum</Link>
            <Link to={Route.NotFound}>404</Link>
            <Link to={Route.ServerErr}>500</Link>
        </div>
    </>
);

export default Layout;
