import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchForumTopics } from '@/store/slices/forumSlice';
import style from './forumPage.module.scss';
import Button from '@/components/ui/button/button';
import { TTopicForSave, TTopicMessageForSave } from '@/types/forumDataTypes';
import { ForumModal } from '../common/modal/forumModal';
import forumApi from '@/api/ForumApi';
import { TopicList } from './topicList/topicList';
import { RootState, useAppDispatch } from '@/store';
import { TFetchStatus } from '@/types/data-types';

const ForumPage: FC = () => {
    const { page = 1 } = useParams();
    const [isModalActive, setIsModalActive] = useState(false);
    const dispatch = useAppDispatch();
    const topicsLoadStatus = useSelector((state: RootState) => state.forum.forum.topicsStatus);

    useEffect(() => {
        if (topicsLoadStatus === TFetchStatus.IDLE) {
            dispatch(fetchForumTopics());
        }
    }, [dispatch, topicsLoadStatus]);

    const addNewTopicToList = () => {
        dispatch(fetchForumTopics());
    };

    const showTopicCreationError = (error: string) => {
        // todo move error to forum slice
        console.log(error);
    };

    const submitMessage = (data: TTopicMessageForSave | TTopicForSave) => {
        const topicData = data as TTopicForSave;
        if (topicData) {
            // todo show loader while saving
            forumApi.saveTopic(topicData, addNewTopicToList, showTopicCreationError);
        } else {
            console.log('Save topic: invalid data for saving');
        }
    };
    return (
        <main className={style.main}>
            <div className={style.content}>
                <h1 className={style.content__title}>Форум</h1>
                <div className={style.content__button}>
                    <Button onClick={() => setIsModalActive(true)} buttonSize="medium">
                        Новая тема
                    </Button>
                </div>
                <TopicList page={+page} />
            </div>
            <ForumModal
                isActive={isModalActive}
                setIsActive={setIsModalActive}
                submit={submitMessage}
                isTopicForm={true}
                rows={6}
                modalTitle="Создание новой темы форума"
            />
        </main>
    );
};
export default ForumPage;
