import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '@components/ui/loader/loader';
import style from './leaderboard.module.scss';
import LeaderBoardApi from '@/api/LeaderBoardApi';

type TLeaderBoard = {
    doorsRating: number;
    email: string;
    login: string;
    lostCount: number;
    name: string;
    score: number;
    winsCount: number;
};

type TLeaderBoards = Array<{ data: TLeaderBoard }>;

type PageDataType = {
    data: Array<TLeaderBoard> | null;
    items: Array<TLeaderBoard> | null;
    isShowPrev: boolean | undefined | null;
    lastPage: number | null;
    isShowNext: boolean | undefined | null;
};

const pageData: PageDataType = {
    data: null,
    items: null,
    isShowPrev: null,
    lastPage: null,
    isShowNext: null,
};

const Leaderboard: FC = () => {
    const [responseState, setResponseState] = useState<TLeaderBoards | null>(null);

    useEffect(() => {
        const getBoardData = async () => {
            const leaderBoardApi = new LeaderBoardApi();
            leaderBoardApi
                .getLeaderboardData()
                .then(res => {
                    setResponseState(res.data);
                })
                .catch(e => {
                    console.log('Error', e);
                });
        };
        getBoardData();
    }, []);

    const { page = 1 } = useParams();

    if (responseState !== null) {
        pageData.data = responseState.map(userData => userData.data);
        pageData.items = pageData.data.slice((+page! - 1) * 10, +page! * 10);
        pageData.isShowPrev = page && +page > 1 ? true : undefined;
        pageData.lastPage = Math.ceil(pageData.data.length / 10);
        pageData.isShowNext = page && +page < pageData.lastPage ? true : undefined;
    }

    return responseState !== null ? (
        <main className={style.main}>
            <div>
                <h1 className={style.h1}>Таблица достижений</h1>
                <table className={style['table-board']}>
                    <thead>
                        <tr className={style.tr}>
                            <th className={style.td}>Имя</th>
                            <th className={style.td}>Логин</th>
                            <th className={style.td}>Побед</th>
                            <th className={style.td}>Поражений</th>
                            <th className={style.td}>Эффективность стрельбы</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageData.items!.map(item => (
                            <tr key={item.login} className={style.tr}>
                                <td className={style.td}>{item.name}</td>
                                <td className={style.td}>{item.login}</td>
                                <td className={style.td}>{item.winsCount}</td>
                                <td className={style.td}>{item.lostCount}</td>
                                <td className={style.td}>{`${item.score} %`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={style['wrapper-links']}>
                    {pageData.isShowPrev && (
                        <Link className={style.link} to={`/leaderboard/${Number(page) - 1}`}>
                            Prev
                        </Link>
                    )}
                    <span>{`< ${page} >`}</span>
                    {pageData.isShowNext && (
                        <Link className={style.link} to={`/leaderboard/${Number(page) + 1}`}>
                            Next
                        </Link>
                    )}
                </div>
            </div>
        </main>
    ) : (
        <Loader />
    );
};

export default Leaderboard;
