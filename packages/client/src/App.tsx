import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Loader } from '@ui';
import AuthApi from '@/api/AuthApi';
import Router from '@/router/router';
import { setUser } from '@/store/slices/userSlice';
import './App.scss';

function App() {
    const [fetchingUserData, setFetchingUserData] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkUser = () => {
            const authApi = new AuthApi();
            authApi
                .getUserData()
                .then(response => {
                    dispatch(setUser(response.data));
                })
                .catch(e => {
                    console.log('Error', e);
                    dispatch(setUser(null));
                })
                .finally(() => {
                    setFetchingUserData(false);
                });
        };
        checkUser();
    }, []);

    return !fetchingUserData ? (
        <BrowserRouter>
            <React.Suspense fallback={<Loader />}>
                <Router />
            </React.Suspense>
        </BrowserRouter>
    ) : (
        <Loader />
    );
}

export default App;
