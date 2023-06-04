import React, { FC } from 'react';
import cn from 'classnames';
import style from './userIcon.module.scss';

type TUserIcon = {
    type?: string;
    userData?: {
        image?: string;
        firstName?: string;
        secondName?: string;
        email?: string;
    };
};

const getFirstLetter = (string: string): string => {
    if (!string.length) {
        return string;
    }

    return string[0].toUpperCase();
};

const UserIcon: FC<TUserIcon> = props => {
    const { type = 'header', userData = {} } = props;
    const {
        image,
        firstName = 'Петр',
        secondName = 'Таранов',
        email = 'petr_taranov@mail.ru',
    } = userData;

    const userIconClasses = cn(style.userIcon, {
        [style.typeHeader]: type === 'header',
        [style.typeGame]: type === 'game',
    });

    return (
        <div className={userIconClasses}>
            <figure className={style.content}>
                <div className={style.imgContainer}>
                    {image ? (
                        <img src="" alt="" className={style.img} />
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

                    {type === 'header' ? <div className={style.email}>{email}</div> : null}
                </figcaption>
            </figure>
        </div>
    );
};

export default UserIcon;
