import React, { FC, useState } from 'react';
// import { useSelector } from 'react-redux';
import style from './page.module.scss';
import Button from '@/components/ui/button/button';
import Pagination from '@/components/ui/pagination/pagination';
import { TTopicForSave, TTopicInfo, TTopicMessageForSave } from '@/types/data-types';
import { ForumModal } from '../../common/modal/forumModal';
import ForumApi from '@/api/ForumApi';
import { TopicList } from '../topicList/topicList';

// import { RootState } from '@/store';

type ForumContentProps = {
    topics: TTopicInfo[];
    page: number;
    lastPage: number;
};
const Page: FC<ForumContentProps> = ({ topics, page, lastPage }) => {
    const [isModalActive, setIsModalActive] = useState(false);

    /* const forumState = useSelector((state: RootState) => state.forum); //todo make slice
    const topicList = forumState.forum.forumTopics; */

    const forumApi = new ForumApi();

    const addNewTopicToList = (topic: TTopicInfo) => {
        console.log('new topic will be added');
        console.log(topic);
    };

    const showTopicCreationError = (error: string) => {
        console.log(error);
    };

    const submitMessage = (data: TTopicMessageForSave | TTopicForSave) => {
        const type: TTopicForSave = {
            title: '',
            text: '',
        };
        // todo proper type check
        if (typeof data === typeof type) {
            const topicData = data as TTopicForSave;
            console.log('Отправили данные формы', topicData.title, topicData.text);
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
