import React, { FC } from 'react';
import style from './topicList.module.scss';
import { TTopicInfo } from '@/types/data-types';
import { Topic } from '../topic/topic';

type TTopicListProps = {
    topics: TTopicInfo[];
};

export const TopicList: FC<TTopicListProps> = ({ topics }) => (
    <div className={style.topicList}>
        {topics.map(topic => (
            <Topic topic={topic} />
        ))}
    </div>
);
