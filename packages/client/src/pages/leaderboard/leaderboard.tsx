import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from './leaderboard.module.scss';

const Leaderboard: FC = () => {
    const { page } = useParams();
    const items = [
        {
            name: 'Петр',
            email: 'petr_taranov@mail.ru',
            login: 'Taran',
            winsCount: 5,
            lostCount: 7,
            score: 95,
        },
        {
            name: 'Борис',
            email: 'barbados@caribes.ru',
            login: 'Barbados',
            winsCount: 10,
            lostCount: 7,
            score: 87,
        },
        {
            name: 'Валентина',
            email: 'widow@black.hell',
            login: 'Black Widow',
            winsCount: 101,
            lostCount: 1,
            score: 99,
        },
        {
            name: 'Лёха',
            email: 'pro@gamer.ru',
            login: 'Lammer',
            winsCount: 1,
            lostCount: 3,
            score: 43,
        },
        {
            name: 'Иван',
            email: 'sparrow@black_pearl.ru',
            login: 'Captain Jack',
            winsCount: 100,
            lostCount: 3,
            score: 98,
        },
    ];
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
                <Link className={style.link} to={`/leaderboard/${Number(page) + 1}`}>
                    Next
                </Link>
            </div>
        </main>
    );
};

export default Leaderboard;
