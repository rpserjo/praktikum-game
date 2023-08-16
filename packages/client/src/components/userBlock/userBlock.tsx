import React, { FC } from 'react';
import API from '@/api/api';
import { TUser } from '@/store/slices/userSlice';
import style from './userBlock.module.scss';

type TUserBlock = {
    user: TUser;
};
const UserBlock: FC<TUserBlock> = ({ user }) => {
    const userDisplayName = user?.display_name ? user.display_name : user.login;

    return (
        <div className={style.user}>
            <div className={style['user-avatar']}>
                {user.avatar !== null ? (
                    <img src={API.RESOURCES + user.avatar} alt="Аватар пользователя" />
                ) : (
                    <div className={style['no-avatar']}>
                        {user.first_name.charAt(0)}
                        {user.second_name.charAt(0)}
                    </div>
                )}
            </div>
            <div className={style['user-info']}>
                <div className={style['user-name']}>{userDisplayName}</div>
                <div className={style['user-email']}>{user.email}</div>
            </div>
        </div>
    );
};

export default UserBlock;
