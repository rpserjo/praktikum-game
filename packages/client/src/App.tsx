import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { Loader } from '@ui';
import Router from '@/router/router';
import { RootState } from '@/store';
import { setDefaultTheme } from '@/utils/setDefaultTheme';

function App() {
    const state = useSelector((rootState: RootState) => {
        const { user, theme } = rootState;
        return { user, theme };
    });

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await setDefaultTheme(state, dispatch);
        })();
    }, []);

    return (
        <React.Suspense fallback={<Loader />}>
            <Router />
        </React.Suspense>
    );
}

export default App;
