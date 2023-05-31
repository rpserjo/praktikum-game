import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import style from './header.module.scss';

type HeaderProps = {}; // eslint-disable-line

const Header: FC<HeaderProps> = (): ReactElement => (
    <div className={style.header}>
        <div className={style.logo}>ЛОГО</div>
        <div className={style.navigation}>
            <Link to="/">Landing</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/signin">Sign in</Link>
            <Link to="/game">Game</Link>
            <Link to="/leaderboard/1">Leaderboard</Link>
            <Link to="/forum">Forum</Link>
        </div>
    </div>
);

export default Header;
