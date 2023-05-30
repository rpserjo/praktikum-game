import React, { FC, ReactElement } from 'react';
import { Button } from '@ui';
import style from './header.module.scss';

type HeaderProps = {}; // eslint-disable-line

const Header: FC<HeaderProps> = (): ReactElement => (
    <div className={style.header}>
        <div className={style.logo}>ЛОГО</div>
        <div className={style.navigation}>
            <Button buttonSize="medium">Нажми меня</Button>
        </div>
    </div>
);

export default Header;
