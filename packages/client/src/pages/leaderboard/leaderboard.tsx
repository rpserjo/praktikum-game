import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from './leaderboard.module.scss';
import MockServer from '@/mocks/mock-server';

const Leaderboard: FC = () => {
    const { page } = useParams();

    const server = new MockServer();
    const data = server.getLeaderBoardData();
    const items = data.slice((+page! - 1) * 10, +page! * 10);

    const isShowPrev = page && +page > 1 ? true : undefined;

    const lastPage = Math.ceil(data.length / 10);
    const isShowNext = page && +page < lastPage ? true : undefined;

    return (
        <main className={style.main}>
            <div>
                <h1 className={style.h1}>Таблица достижений</h1>
                <table className={style['table-board']}>
                    <tr className={style.tr}>
                        <th className={style.td}>Имя</th>
                        <th className={style.td}>Логин</th>
                        <th className={style.td}>Побед</th>
                        <th className={style.td}>Поражений</th>
                        <th className={style.td}>Эффективность стрельбы</th>
                    </tr>
                    {items.map(item => (
                        <tr className={style.tr}>
                            <td className={style.td}>{item.name}</td>
                            <td className={style.td}>{item.login}</td>
                            <td className={style.td}>{item.winsCount}</td>
                            <td className={style.td}>{item.lostCount}</td>
                            <td className={style.td}>{`${item.score} %`}</td>
                        </tr>
                    ))}
                </table>
                <div className={style['wrapper-links']}>
                    {isShowPrev && (
                        <Link className={style.link} to={`/leaderboard/${Number(page) - 1}`}>
                            Prev
                        </Link>
                    )}
                    <span>{`< ${page} >`}</span>
                    {isShowNext && (
                        <Link className={style.link} to={`/leaderboard/${Number(page) + 1}`}>
                            Next
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Leaderboard;
