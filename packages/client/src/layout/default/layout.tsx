import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/header/header';
import style from './layout.module.scss';

type TLayoutProps = {
    showHeader?: boolean;
};

const Layout: FC<TLayoutProps> = ({ showHeader = true }) => (
    <div className={style.wrapper}>
        {showHeader && <Header />}
        <Outlet />
    </div>
);

export default Layout;
