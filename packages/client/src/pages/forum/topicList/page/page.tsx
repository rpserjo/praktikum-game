import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTopicList } from '@/store/slices/forumSlice';
import style from './page.module.scss';
import Button from '@/components/ui/button/button';
import Pagination from '@/components/ui/pagination/pagination';
import { TTopicForSave, TTopic, TTopicMessageForSave } from '@/types/forumDataTypes';
import { ForumModal } from '../../common/modal/forumModal';
import forumApi from '@/api/ForumApi';
import { TopicList } from '../topicList/topicList';

type ForumContentProps = {
    topics: TTopic[];
    page: number;
    lastPage: number;
};
const Page: FC<ForumContentProps> = ({ topics, page, lastPage }) => {
    const [isModalActive, setIsModalActive] = useState(false);
    const dispatch = useDispatch();

    console.log('inside page render, topics: ');

    const addNewTopicToList = (topic: TTopic) => {
        // console.log('new topic will be added');
        const cloneTopics = [...topics];
        cloneTopics.push(topic);
        dispatch(setTopicList({ topics: cloneTopics, lastPage }));
    };

    const showTopicCreationError = (error: string) => {
        console.log(error);
    };

    const submitMessage = (data: TTopicMessageForSave | TTopicForSave) => {
        const topicData = data as TTopicForSave;
        if (topicData) {
            // setIsLoaderActive(true);
            // todo <Loader/> while saving!!
            forumApi.saveTopic(topicData, addNewTopicToList, showTopicCreationError);
        } else {
            console.log('error'); // todo
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
                <TopicList topics={topics} />
                <Pagination currentPage={+page} lastPage={lastPage} linkPath="/forum/" />
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
export default Page;
