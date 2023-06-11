import React, { FC } from 'react';
import style from '@pages/profile/profile.module.scss';
import { Button } from '@ui';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { PROFILE_FIELDS, TProfileProps } from '@pages/profile/profile';
import AvatarUploader from '@components/avatarUploader/avatarUploader';
import API from '@/api/api';

const DefaultProfileView: FC<{ userData: TProfileProps }> = ({ userData }) => {
    const navigate = useNavigate();
    return (
        <div className={style.profile}>
            <div className={style.wrapper}>
                <h1>Профиль</h1>
                <div className={style.avatar}>
                    <AvatarUploader currentAvatar={API.RESOURCES + userData.avatar} />
                </div>
                <div className={style.info}>
                    <div className={style.fullname}>
                        {userData.first_name}
                        {userData.second_name}
                    </div>
                    <div className={style.rows}>
                        <div className={style.row}>
                            <div className={style.rowname}>{PROFILE_FIELDS.first_name}</div>
                            <div className={style.rowvalue}>{userData.first_name}</div>
                        </div>
                        <div className={style.row}>
                            <div className={style.rowname}>{PROFILE_FIELDS.second_name}</div>
                            <div className={style.rowvalue}>{userData.second_name}</div>
                        </div>
                        <div className={style.row}>
                            <div className={style.rowname}>{PROFILE_FIELDS.display_name}</div>
                            <div className={style.rowvalue}>{userData.display_name}</div>
                        </div>
                        <div className={style.row}>
                            <div className={style.rowname}>{PROFILE_FIELDS.email}</div>
                            <div className={style.rowvalue}>{userData.email}</div>
                        </div>
                        <div className={style.row}>
                            <div className={style.rowname}>{PROFILE_FIELDS.phone}</div>
                            <div className={style.rowvalue}>{userData.phone}</div>
                        </div>
                        <div className={style.row}>
                            <div className={style.rowname}>{PROFILE_FIELDS.login}</div>
                            <div className={style.rowvalue}>{userData.login}</div>
                        </div>
                    </div>
                </div>
                <div className={style.actions}>
                    <div className={cn(style.row, style.sb)}>
                        <Button buttonSize="medium" onClick={() => navigate('/profile/edit')}>
                            Изменить данные
                        </Button>
                        <Button buttonSize="medium" onClick={() => navigate('/profile/password')}>
                            Изменить пароль
                        </Button>
                    </div>
                    <div className={cn(style.row, style.center)}>
                        <Button
                            buttonSize="medium"
                            buttonStyle="outlined"
                            onClick={() => navigate(-1)}
                        >
                            Назад
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultProfileView;
