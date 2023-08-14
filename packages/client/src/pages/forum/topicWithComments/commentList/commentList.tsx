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
    const { page = 1, topicId } = useParams();
    const dispatch = useAppDispatch();
    const { commentsData, commentsLoadStatus, commentsLoadError } = useSelector(
        (state: RootState) => state.forum.topicInfo
    );
    useEffect(() => {
        if (topicId) {
            dispatch(fetchTopicComments({ topicId: +topicId, page: +page }));
        }
    }, [topicId, page]);

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
        content = <div>{commentsLoadError}</div>;
    }
    return <div>{content}</div>;
};
