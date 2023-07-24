import React, { FC } from 'react';
import style from './page.module.scss';
import Pagination from '@/components/ui/pagination/pagination';
import { TopicInfo } from '../topicInfo/topicInfo';
import { TTopicMessage, TTopicInfo } from '@/types/forumDataTypes';
import { MessageList } from '../messageList/messageList';

export type TServerData = {
    // eslint-disable-next-line
    topic: TTopicInfo;
    // eslint-disable-next-line
    comments: TTopicMessage[];
    // eslint-disable-next-line
    page: number;
    // eslint-disable-next-line
    lastPage: number;
};

const ForumTopic: FC<TServerData> = data => {
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
