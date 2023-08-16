import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
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

    return <Router />;
}

export default App;
