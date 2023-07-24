import React, { FC } from 'react';
import style from './page.module.scss';
import Pagination from '@/components/ui/pagination/pagination';
import { TopicInfo } from '../topicInfo/topicInfo';
import { TTopic, TTopicComment } from '@/types/forumDataTypes';
import { MessageList } from '../commentList/commentList';

type TTopicWithCommentsData = {
    // eslint-disable-next-line
    topic: TTopic;
    // eslint-disable-next-line
    comments: TTopicComment[];
    // eslint-disable-next-line
    page: number;
    // eslint-disable-next-line
    lastPage: number;
};

const ForumTopic: FC<TTopicWithCommentsData> = data => {
    const { topic, comments, lastPage, page } = data;

    return (
        <main className={style.main}>
            <div className={style.content}>
                <TopicInfo info={topic} />
                <MessageList messages={comments} />
                <Pagination
                    currentPage={page}
                    lastPage={lastPage}
                    linkPath={`/forum-topic/${topic.id}/`}
                />
            </div>
        </main>
    );
};

export default ForumTopic;
