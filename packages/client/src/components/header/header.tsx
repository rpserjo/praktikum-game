import React, { FC, MouseEventHandler, ReactElement } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button/button';
import UserBlock from '@/components/userBlock/userBlock';
import AuthApi from '@/api/AuthApi';
import { RouteNames } from '@/router/router';
import { setUser } from '@/store/slices/userSlice';
import style from './header.module.scss';
import Logo from '@/assets/logo.svg';
import { RootState } from '@/store';

type HeaderProps = {}; // eslint-disable-line

const Header: FC<HeaderProps> = (): ReactElement => {
    const dispatch = useDispatch();

    const handleLogout: MouseEventHandler = () => {
        const authApi = new AuthApi();
        authApi
            .logout()
            .then(() => {
                alert('Logged out');
                dispatch(setUser(null));
            })
            .catch(e => console.log(e));
    };

    const userState = useSelector((state: RootState) => state.user);

    return (
        <div className={style.header}>
            <div className={style.logo}>
                <Link to={RouteNames.LANDING}>
                    <img alt="Главная" src={Logo} />
                </Link>
            </div>
            <div className={style.navigation}>
                <div className={style.links}>
                    <NavLink
                        to={RouteNames.FORUM}
                        className={({ isActive }) => (isActive ? style.active : '')}
                    >
                        Форум
                    </NavLink>

                    <NavLink
                        to="/leaderboard/1"
                        className={({ isActive }) => (isActive ? style.active : '')}
                    >
                        Лидерборд
                    </NavLink>

                    <NavLink
                        to={RouteNames.PROFILE}
                        className={({ isActive }) => (isActive ? style.active : '')}
                    >
                        Профиль
                    </NavLink>
                </div>
                <div className={style.user}>
                    {userState.user !== null && <UserBlock user={userState.user} />}
                </div>
                <Button buttonSize="medium" onClick={handleLogout}>
                    Выйти
                </Button>
            </div>
        </div>
    );
};

export default Header;
