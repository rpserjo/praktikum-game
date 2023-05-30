import React, { FC } from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: FC = () => {
    const error: unknown = useRouteError();
    const errorMessage: string = error instanceof Error ? `${(error as Error).message}` : 'Unknown error';
    return (
        <>
            <h1>Error</h1>
            <p>
                <i>{errorMessage}</i>
            </p>
        </>
    );
};

export default ErrorPage;
