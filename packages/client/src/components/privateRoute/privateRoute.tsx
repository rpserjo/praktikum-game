import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RouteNames } from '@/router/router';
import { TState } from '@/store/slices/userSlice';

const PrivateRoutes = () => {
    const userState = useSelector((state: { user: TState }) => state.user);
    return userState.user !== null ? <Outlet /> : <Navigate to={RouteNames.SIGNIN} />;
};

export default PrivateRoutes;
