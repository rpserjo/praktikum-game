import React, { FC, ReactNode } from 'react';
import Header from '../components/header/header';
import style from './layout.module.scss';

type LayoutProps = {
    children: ReactNode;
};
const Layout: FC<LayoutProps> = ({ children }) => (
    <div className={style.wrapper}>
        <Header />
        <div className="">{children}</div>
    </div>
);

export default Layout;
