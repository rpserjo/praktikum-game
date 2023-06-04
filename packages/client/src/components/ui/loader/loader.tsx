import React, { FC } from 'react';
import style from './loader.module.scss';

const Loader: FC = () => (
    <div className={style.loader}>
        <div className={style.spinner}>
            <div />
            <div />
        </div>
    </div>
);

export default Loader;
