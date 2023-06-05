import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../../components/header/header';
import style from './layout.module.scss';

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
            <Link to="/">Landing</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/signin">Sign in</Link>
            <Link to="/home">Home</Link>
            <Link to="/game">Game</Link>
            <Link to="/game/start">Game start</Link>
            <Link to="/game/finish">Game finish</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/forum">Forum [404]</Link>
            <Link to="/500">500</Link>
        </div>
    </>
);

export default Layout;
