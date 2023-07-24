import React, { FC } from 'react';
import style from './topicList.module.scss';
import { TTopic } from '@/types/forumDataTypes';
import { Topic } from '../topic/topic';

type TTopicListProps = {
    topics: TTopic[];
};

export const TopicList: FC<TTopicListProps> = ({ topics }) => (
    <div className={style.topicList}>
        {topics.map(topic => (
            <Topic topic={topic} />
        ))}
    </div>
);
