import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './commentList.module.scss';
import { Message } from '../comment/comment';
import Pagination from '@/components/ui/pagination/pagination';
import { RootState, useAppDispatch } from '@/store';
import { Loader } from '@/components/ui';
import { TFetchStatus } from '@/types/data-types';
import { fetchTopicComments } from '@/store/slices/forumSlice';

export const CommentList: FC = () => {
    const { page = 1, topicId } = useParams(); // todo topic id?

    const forumState = useSelector((state: RootState) => state.forum);

    const error = useSelector((state: RootState) => state.forum.forum.topicsLoadError);

    const dispatch = useAppDispatch();
    const commentsLoadStatus = useSelector(
        (state: RootState) => state.forum.topicInfo.commentsLoadStatus
    );
    useEffect(() => {
        if (commentsLoadStatus === TFetchStatus.IDLE && topicId) {
            dispatch(fetchTopicComments({ topicId: +topicId, page: +page }));
        }
    }, [dispatch, commentsLoadStatus]);

    const { commentsData } = forumState.topicInfo;
    let content;
    if (commentsLoadStatus === TFetchStatus.LOADING) {
        content = <Loader />;
        // todo do we need check in here?
        // todo message for no comments
    } else if (commentsLoadStatus === TFetchStatus.SUCCEEDED && commentsData) {
        content = (
            <>
                <div className={style.comments}>
                    {commentsData.comments.map(item => (
                        <Message key={item.id} message={item} />
                    ))}
                </div>
                <Pagination
                    currentPage={+page}
                    lastPage={commentsData.lastPage}
                    linkPath={`/forum-topic/${topicId}/`}
                />
            </>
        );
    } else if (commentsLoadStatus === TFetchStatus.FAILED) {
        content = <div>{error}</div>;
    }
    return <div>{content}</div>;
};
