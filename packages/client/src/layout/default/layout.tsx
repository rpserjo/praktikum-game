import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '@components/header/header';
import style from './layout.module.scss';
import { RouteNames } from '@/router/router';

type TLayoutProps = {
    showHeader?: boolean;
};

const Layout: FC<TLayoutProps> = ({ showHeader = true }) => (
    <>
        <div className={style.wrapper}>
            {showHeader && <Header />}
            <Outlet />
        </div>

        <div className={style['bottom-links']}>
            <Link to={RouteNames.LANDING}>Landing</Link>
            <Link to={RouteNames.SIGNUP}>Sign up</Link>
            <Link to={RouteNames.SIGNIN}>Sign in</Link>
            <Link to={RouteNames.HOME}>Home</Link>
            <Link to={RouteNames.GAME}>Game</Link>
            <Link to={RouteNames.GAME_START}>Game start</Link>
            <Link to={RouteNames.GAME_FINISH}>Game finish</Link>
            <Link to={RouteNames.PROFILE}>Profile</Link>
            <Link to={RouteNames.LEADERBOARD}>Leaderboard</Link>
            <Link to={RouteNames.FORUM}>Forum</Link>
            <Link to={RouteNames.NOT_FOUND}>404</Link>
            <Link to={RouteNames.SERVER_ERROR}>500</Link>
        </div>
    </>
);

export default Layout;
