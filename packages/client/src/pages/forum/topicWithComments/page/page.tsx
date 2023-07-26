import React, { FC } from 'react';
import style from './page.module.scss';
import Pagination from '@/components/ui/pagination/pagination';
import { TopicInfo } from '../topicInfo/topicInfo';
import { TTopic, TTopicComment } from '@/types/forumDataTypes';
import { MessageList } from '../commentList/commentList';

type TTopicWithCommentsData = {
    topic: TTopic;
    comments: TTopicComment[];
    page: number;
    lastPage: number;
};

const ForumTopic: FC<TTopicWithCommentsData> = ({ topic, comments, lastPage, page }) => (
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

export default ForumTopic;
