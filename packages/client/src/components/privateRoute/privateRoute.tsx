import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthApi from '@/api/AuthApi';
import Loader from '@/components/ui/loader/loader';
import { RouteNames } from '@/router/router';
import { TProfileProps } from '@/models/models';

const PrivateRoutes = () => {
    const authApi = new AuthApi();
    const [userData, setUserData] = useState<TProfileProps | null>(null);
    const [userFetched, setUserFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await authApi.getUser(setUserData, setUserFetched);
        };
        fetchData();
    }, []);

    if (userFetched) {
        const isLoggedIn = userData != null;
        return isLoggedIn ? <Outlet /> : <Navigate to={RouteNames.SIGNIN} />;
    }
    return <Loader />;
};
export default PrivateRoutes;
