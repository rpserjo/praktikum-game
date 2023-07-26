import React, { FC, useState } from 'react';
// import { useSelector } from 'react-redux';
import style from './page.module.scss';
import Button from '@/components/ui/button/button';
import Pagination from '@/components/ui/pagination/pagination';
import { TTopicForSave, TTopic, TTopicMessageForSave } from '@/types/forumDataTypes';
import { ForumModal } from '../../common/modal/forumModal';
import forumApi from '@/api/ForumApi';
import { TopicList } from '../topicList/topicList';
// todo add redux to update page data
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { Loader } from '@/components/ui';

// imp/ort { RootState } from '@/store';

type ForumContentProps = {
    topics: TTopic[];
    page: number;
    lastPage: number;
};
const Page: FC<ForumContentProps> = ({ topics, page, lastPage }) => {
    // topics,
    const [isModalActive, setIsModalActive] = useState(false);
    // todo add redux to update page data

    /* const [topicsNew, setForumTopics] = useState<TTopic[]>();
    const forumApi = forumApi();

    const forumState = useSelector((state: RootState) => state.forum);
    const { forum } = forumState;
    useEffect(() => {
        console.log('inside useEffect');
        console.log(forum.forumTopics);
        setForumTopics(forum.forumTopics as TTopic[]);
    }, []); */

    const addNewTopicToList = (topic: TTopic) => {
        console.log('new topic will be added');
        console.log(topic);
    };

    const showTopicCreationError = (error: string) => {
        console.log(error);
    };

    const submitMessage = (data: TTopicMessageForSave | TTopicForSave) => {
        const topicData = data as TTopicForSave;
        if (topicData) {
            console.log('Отправили данные формы', topicData.title, topicData.text);
            // setIsLoaderActive(true);
            // todo <Loader/> while saving!!
            // addNewTopicToList,
            forumApi.saveTopic(topicData, addNewTopicToList, showTopicCreationError);
        } else {
            console.log('error'); // todo
        }
    };

    /* if (!topics) {
        return <Loader />;
    } */

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
