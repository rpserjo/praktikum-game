import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authController from '@/controllers/authController';
import { RouteNames } from '@/layout/default/layout';

const PrivateRoutes = () => {
    const isLoggedIn = authController.isLoggedIn();
    return isLoggedIn ? <Outlet /> : <Navigate to={RouteNames.SIGNIN} />;
};
export default PrivateRoutes;
