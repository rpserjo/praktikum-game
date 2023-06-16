import React, { FC, useEffect, useState } from 'react';
import DefaultProfileView from '@pages/profile/views/default';
import EditProfileView from '@pages/profile/views/edit';
import Loader from '@components/ui/loader/loader';
import EditPasswordView from '@pages/profile/views/password';
import AuthApi from '@/api/AuthApi';
import { TProfileProps } from '@/models/models';

export enum ProfileFields {
    EMAIL = 'E-mail',
    LOGIN = 'Логин',
    FIRST_NAME = 'Имя',
    SECOND_NAME = 'Фамилия',
    DISPLAY_NAME = 'Отображаемое имя',
    PHONE = 'Телефон',
    AVATAR = 'Аватар',
}

type TProfilePageProps = {
    section?: 'default' | 'edit' | 'password';
};

const Profile: FC<TProfilePageProps> = ({ section = 'default' }) => {
    const [userData, setUserData] = useState<TProfileProps | undefined>(undefined);
    const authApi = new AuthApi();

    useEffect(() => {
        authApi.getUser(setUserData);
    }, []);

    return userData ? (
        section === 'password' ? (
            <EditPasswordView />
        ) : section === 'edit' ? (
            <EditProfileView userData={userData} />
        ) : (
            <DefaultProfileView userData={userData} />
        )
    ) : (
        <Loader />
    );
};

export default Profile;
