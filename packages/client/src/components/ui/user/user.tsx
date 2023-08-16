import React, { FC } from 'react';
import cn from 'classnames';
import style from './user.module.scss';
import API from '@/api/api';
import { TUser } from '@/store/slices/userSlice';

export enum Type {
    header = 'header',
    game = 'game',
}

type TUserBlock = {
    type: Type;
    userData: Partial<TUser>;
};

const getFirstLetter = (string: string): string => {
    if (string.length === 0) {
        return '';
    }

    return string[0].toUpperCase();
};

const defaultUserValues: TUserBlock = {
    type: Type.header,
    userData: {
        avatar: '',
        first_name: '',
        second_name: '',
        email: '',
    },
};

const User: FC<TUserBlock | null> = props => {
    const { type, userData } = props ?? defaultUserValues;
    const { avatar, first_name = '', second_name = '', email } = userData;

    const userIconClasses = cn(style.userIcon, {
        [style.typeHeader]: type === Type.header,
        [style.typeGame]: type === Type.game,
    });

    return (
        <div className={userIconClasses}>
            <figure className={style.content}>
                <div className={style.imgContainer}>
                    {avatar ? (
                        <img src={API.RESOURCES + avatar} alt="" className={style.img} />
                    ) : (
                        <div>
                            <span className={style.initial}>{getFirstLetter(first_name)}</span>
                            <span className={style.initial}>{getFirstLetter(second_name)}</span>
                        </div>
                    )}
                </div>

                <figcaption className={style.caption}>
                    <div className={style.name}>
                        <span className={style.nameItem}>{first_name}</span>
                        <span className={style.nameItem}>{second_name}</span>
                    </div>

                    {type === Type.header ? <div className={style.email}>{email}</div> : null}
                </figcaption>
            </figure>
        </div>
    );
};

export default User;
