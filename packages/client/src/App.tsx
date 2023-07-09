import React from 'react';
import { Loader } from '@ui';
import Router from '@/router/router';
import './App.scss';

function App() {
    return (
        <React.Suspense fallback={<Loader />}>
            <Router />
        </React.Suspense>
    );
}

export default App;
