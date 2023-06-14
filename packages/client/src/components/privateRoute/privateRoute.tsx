import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthApi from '@/api/AuthApi';
import Loader from '../ui/loader/loader';
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

const PrivateRoutes = () => {
    const authApi = new AuthApi();
    const [userData, setUserData] = useState<TProfileProps | null>(null);
    const [userFetched, setUserFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await authApi
                .user()
                .then(response => {
                    setUserData(response.data as TProfileProps);
                    setUserFetched(true);
                })
                .catch(() => {
                    setUserFetched(true);
                });
        };
        fetchData();
    }, []);

    const isLoggedIn = userData != null;

    if (userFetched) {
        return isLoggedIn ? <Outlet /> : <Navigate to={RouteNames.SIGNIN} />;
    }
    return <Loader />;
};
export default PrivateRoutes;
