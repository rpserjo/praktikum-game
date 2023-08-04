/* 
todo fix tests

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ForumPage from './forumPage';
import { Provider } from 'react-redux';
import { StoreState, createStore } from '@/store';
import { TForumState } from '@/store/slices/forumSlice';
import { TFetchStatus } from '@/types/data-types';
import { UserService } from '@/api/UserService';
import { YandexAPIRepository } from '@/repository/YandexAPIRepository';

const initialState: StoreState = {
    forum: { topicList: null, topic: null, topicComments: null, topicsStatus: TFetchStatus.IDLE },
};

describe('Forum tests', () => {
    const mockServerData = {
        items: [
            {
                id: 1,
                title: 'Комп выключился при запуске игры',
                message:
                    'Запустил игру, нажал сыграть онлайн, попал в комнату ожидания, дальше ничего не происходило, в конце системник просто вырубился. Включился через 2 минуты. Термопасту менял неделю назад, до этого бывало грелся в играх 88-90, щас макс 65.\r\nrazen 2600 разогнан до 3.9(щас стало 3.7)память 16г 3000 мгц(стало 2660)1660sПервый раз за 3 года, даже винда с покупки стоит.Что это может быть и стоит ли волноваться?',
                author: 'Barbados',
                createdDate: '2023-05-22T12:51:00',
                commentsCount: 2,
                lastCommentDate: '2023-05-22T12:51:00',
                authorAvatar: null,
            },
            {
                id: 2,
                title: 'Комп выключился при запуске игры',
                message: 'Проверь блок питания',
                author: 'Джек Воробей',
                createdDate: '2023-05-22T13:06:00',
                lastCommentDate: '2023-05-22T12:51:00',
                commentsCount: 2,
                authorAvatar: null,
            },
            {
                id: 3,
                title: 'RTX 2060 6gb от Gigabyte греется под нагрузкой под 85 градусов это нормально или же нет?',
                message: 'Не пойму что делать с компьютером, друзья, помогите',
                author: 'Капитан Флинт',
                createdDate: '2023-01-15T16:37:00',
                lastCommentDate: '2023-05-22T12:51:00',
                commentsCount: 2,
                authorAvatar: null,
            },
        ],
        lastPage: 1,
    };

    it('checks that forum renders', () => {
        render(
            <BrowserRouter>
                <Provider
                    store={createStore(new UserService(new YandexAPIRepository()), initialState)}
                >
                    <ForumPage />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Форум')).toBeInTheDocument();
    });

    it('checks that new topic button exists', () => {
        render(
            <BrowserRouter>
                <ForumPage />
            </BrowserRouter>
        );

        expect(screen.getByText('Новая тема')).toBeInTheDocument();
    });

    it('checks that new topic button opens modal', () => {
        render(
            <BrowserRouter>
                <ForumPage />
            </BrowserRouter>
        );
        userEvent.click(screen.getByText('Новая тема'));
        expect(screen.getByText('Создание новой темы форума')).toBeInTheDocument();
    });
});
*/
