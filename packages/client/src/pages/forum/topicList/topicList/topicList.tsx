import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import style from './topicList.module.scss';
import { Topic } from '../topic/topic';
import Pagination from '@/components/ui/pagination/pagination';
import { RootState } from '@/store';
import { TFetchStatus } from '@/types/data-types';
import { Loader } from '@/components/ui';

type TTopicListProps = {
    page: number;
};

export const TopicList: FC<TTopicListProps> = ({ page }) => {
    const forumState = useSelector((state: RootState) => state.forum);

    const topicsLoadStatus = useSelector((state: RootState) => state.forum.forum.topicsStatus);
    const error = useSelector((state: RootState) => state.forum.forum.topicsError);

    const { topicList } = forumState.forum;

    let content;
    if (topicsLoadStatus === TFetchStatus.LOADING) {
        content = <Loader />; // todo do we need check in here?
    } else if (topicsLoadStatus === TFetchStatus.SUCCEEDED && topicList) {
        content = (
            <>
                <div className={style.topicList}>
                    {topicList.topics.map(topic => (
                        <Topic key={topic.id} topic={topic} />
                    ))}
                </div>
                <Pagination currentPage={+page} lastPage={topicList.lastPage} linkPath="/forum/" />
            </>
        );
    } else if (topicsLoadStatus === TFetchStatus.FAILED) {
        content = <div>{error}</div>;
    }
    return <div>{content}</div>;
};
