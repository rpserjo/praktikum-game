import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import style from './layout.module.scss';

const Layout: FC = () => (
    <>
        <div className={style.wrapper}>
            <Header />
            <Outlet />
        </div>

        <div className={style['bottom-links']}>
            <Link to="/">Landing</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/signin">Sign in</Link>
            <Link to="/game">Game</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/leaderboard/1">Leaderboard</Link>
            <Link to="/forum">Forum</Link>
        </div>
    </>
);

export default Layout;
