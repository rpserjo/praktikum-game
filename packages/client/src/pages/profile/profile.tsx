import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultProfileView from '@pages/profile/views/default';
import EditProfileView from '@pages/profile/views/edit';
import Loader from '@components/ui/loader/loader';
import EditPasswordView from '@pages/profile/views/password';
import AuthApi from '@/api/AuthApi';
import { RouteNames } from '@/router/router';

export type TProfileProps = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar?: string;
};

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
    const navigate = useNavigate();
    const authApi = new AuthApi();

    useEffect(() => {
        authApi
            .user()
            .then(response => {
                setUserData(response.data as TProfileProps);
            })
            .catch(e => {
                alert(`Error: ${e.code}`);
                navigate(RouteNames.SIGNIN);
            });
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
