import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from './leaderboard.module.scss';
import MockServer from '../../mocks/mock-server';

const Leaderboard: FC = () => {
    const { page } = useParams();

    const server = new MockServer();
    const items = server.getLeaderBoardData();

    const isShowPrev = page && +page > 1 ? true : undefined;

    return (
        <main className={style.main}>
            <div>
                <h1 className={style.h1}>Таблица достижений</h1>
                <table className={style['table-board']}>
                    <tr className={style.tr}>
                        <th className={style.td}>Имя</th>
                        <th className={style.td}>E-mail</th>
                        <th className={style.td}>Логин</th>
                        <th className={style.td}>Побед</th>
                        <th className={style.td}>Поражений</th>
                        <th className={style.td}>Эффективность стрельбы</th>
                    </tr>
                    {items.map(item => (
                        <tr className={style.tr}>
                            <td className={style.td}>{item.name}</td>
                            <td className={style.td}>{item.email}</td>
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
                    <Link className={style.link} to={`/leaderboard/${Number(page) + 1}`}>
                        Next
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Leaderboard;
