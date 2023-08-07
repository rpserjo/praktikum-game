import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './topicList.module.scss';
import { Topic } from '../topic/topic';
import Pagination from '@/components/ui/pagination/pagination';
import { RootState, useAppDispatch } from '@/store';
import { TFetchStatus } from '@/types/data-types';
import { Loader } from '@/components/ui';
import { fetchForumTopics } from '@/store/slices/forumSlice';

export const TopicList: FC = () => {
    const { page = 1 } = useParams();
    const dispatch = useAppDispatch();
    const { topicList, topicsLoadStatus, topicsLoadError } = useSelector(
        (state: RootState) => state.forum.forum
    );

    useEffect(() => {
        // todo do we need (topicsLoadStatus === TFetchStatus.IDLE)
        dispatch(fetchForumTopics(+page));
    }, [page]); // todo do we need dependency on dispatch, page

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
        content = <div>{topicsLoadError}</div>;
    }
    return <div>{content}</div>;
};
