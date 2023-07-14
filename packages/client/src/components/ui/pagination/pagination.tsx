import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './pagination.module.scss';

type PaginationProps = {
    currentPage: number;
    lastPage: number;
    linkPath: string;
};

const Pagination: FC<PaginationProps> = ({ currentPage, lastPage, linkPath }) => (
    <div className={style.pagination}>
        {currentPage > 1 && (
            <Link className={style.pagination__link} to={`${linkPath}${currentPage - 1}`}>
                Prev
            </Link>
        )}
        <span>{`< ${currentPage} >`}</span>
        {currentPage < lastPage && (
            <Link className={style.pagination__link} to={`${linkPath}${currentPage + 1}`}>
                Next
            </Link>
        )}
    </div>
);

export default Pagination;
