import React, { FC } from 'react';
import cn from 'classnames';
import style from './user.module.scss';

export enum Type {
    header = 'header',
    game = 'game',
}

type TUser = {
    type?: Type;
    userData?: {
        imageUrl?: string;
        firstName?: string;
        secondName?: string;
        email?: string;
    };
};

const getFirstLetter = (string: string): string => {
    if (string.length === 0) {
        return '';
    }

    return string[0].toUpperCase();
};

const User: FC<TUser> = props => {
    const { type = Type.header, userData = {} } = props;
    const { imageUrl, firstName = '', secondName = '', email = '' } = userData;

    const userIconClasses = cn(style.userIcon, {
        [style.typeHeader]: type === Type.header,
        [style.typeGame]: type === Type.game,
    });

    return (
        <div className={userIconClasses}>
            <figure className={style.content}>
                <div className={style.imgContainer}>
                    {imageUrl ? (
                        <img src={imageUrl} alt="" className={style.img} />
                    ) : (
                        <div>
                            <span className={style.initial}>{getFirstLetter(firstName)}</span>
                            <span className={style.initial}>{getFirstLetter(secondName)}</span>
                        </div>
                    )}
                </div>

                <figcaption className={style.caption}>
                    <div className={style.name}>
                        <span className={style.nameItem}>{firstName}</span>
                        <span className={style.nameItem}>{secondName}</span>
                    </div>

                    {type === Type.header ? <div className={style.email}>{email}</div> : null}
                </figcaption>
            </figure>
        </div>
    );
};

export default User;
