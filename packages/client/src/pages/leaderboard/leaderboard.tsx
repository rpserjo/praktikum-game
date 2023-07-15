import React, { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@components/ui/loader/loader';
import style from './leaderboard.module.scss';
import LeaderBoardApi from '@/api/LeaderBoardApi';
import { setLeaderBoard, TLeaderBoard } from '@/store/slices/leaderBoardSlice';
import { RootState } from '@/store';

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
    const dispatch = useDispatch();
    const leaderBoardState = useSelector((state: RootState) => state.leaderBoard);

    useEffect(() => {
        const getBoardData = async () => {
            const leaderBoardApi = new LeaderBoardApi();
            leaderBoardApi
                .getLeaderboardData()
                .then(response => {
                    dispatch(setLeaderBoard(response.data));
                })
                .catch(e => {
                    console.log('Error', e);
                    dispatch(setLeaderBoard(null));
                });
        };
        getBoardData();
    }, []);

    const { page = 1 } = useParams();

    if (leaderBoardState.leaderBoard !== null) {
        pageData.data = leaderBoardState.leaderBoard.map(userData => userData.data);
        pageData.items = pageData.data.slice((+page! - 1) * 10, +page! * 10);
        pageData.isShowPrev = page && +page > 1 ? true : undefined;
        pageData.lastPage = Math.ceil(pageData.data.length / 10);
        pageData.isShowNext = page && +page < pageData.lastPage ? true : undefined;
    }

    return leaderBoardState.leaderBoard !== null ? (
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
