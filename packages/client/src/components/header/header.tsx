import React, { FC, ReactElement } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@ui';
import style from './header.module.scss';
import Logo from '@/assets/logo.svg';

type HeaderProps = {}; // eslint-disable-line

const Header: FC<HeaderProps> = (): ReactElement => (
    <div className={style.header}>
        <div className={style.logo}>
            <Link to="/">
                <img alt="Главная" src={Logo} />
            </Link>
        </div>
        <div className={style.navigation}>
            <div className={style.links}>
                <NavLink to="/forum" className={({ isActive }) => (isActive ? style.active : '')}>
                    Форум
                </NavLink>

                <NavLink
                    to="/leaderboard/1"
                    className={({ isActive }) => (isActive ? style.active : '')}
                >
                    Лидерборд
                </NavLink>

                <NavLink to="/profile" className={({ isActive }) => (isActive ? style.active : '')}>
                    Профиль
                </NavLink>
            </div>
            <div className={style.user}>USER</div>
            <Button buttonSize="medium" onClick={() => console.log('Sign out')}>
                Выйти
            </Button>
        </div>
    </div>
);

export default Header;
