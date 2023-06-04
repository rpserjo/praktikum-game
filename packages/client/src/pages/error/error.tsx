import React, { FC } from 'react';

const ErrorPage: FC<{ code?: number }> = ({ code = 404 }) => (
    <>
        <h1>Error</h1>
        <p>
            <i>{code}</i>
        </p>
    </>
);

export default ErrorPage;
