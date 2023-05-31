import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

const Leaderboard: FC = () => {
    const { page } = useParams();
    return (
        <>
            <h1>Leaderboard</h1>
            <h3>
                Page
                {page}
            </h3>
            <Link to={`/leaderboard/${Number(page) + 1}`}>Next</Link>
        </>
    );
};

export default Leaderboard;
