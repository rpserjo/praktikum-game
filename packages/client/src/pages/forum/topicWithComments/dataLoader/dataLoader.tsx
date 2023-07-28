import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Loader } from '@/components/ui';
import ForumTopic from '../page/page';
import { TCommentListData, TTopic } from '@/types/forumDataTypes';
import forumApi from '@/api/ForumApi';
import { setTopic, setTopicComments } from '@/store/slices/forumSlice';

const ForumTopicData: FC = () => {
    const MAX_ELEMENTS_PER_PAGE = 10;
    const { page = 1, topicId } = useParams();

    const dispatch = useDispatch();
    const { forum } = useSelector((state: RootState) => state.forum);

    useEffect(() => {
        forumApi.getTopic(
            +topicId!,
            (data: TTopic) => {
                console.log('in use effect');
                dispatch(setTopic(data));
            },
            error => {
                console.log(error);
            }
        );

        forumApi.getComments(+topicId!, +page, MAX_ELEMENTS_PER_PAGE, (data: TCommentListData) => {
            dispatch(setTopicComments(data));
        });
    }, [dispatch]);

    if (!forum.topic || !forum.topicComments) {
        return <Loader />;
    }
    return (
        <ForumTopic
            topic={forum.topic}
            comments={forum.topicComments.comments}
            lastPage={forum.topicComments.lastPage}
            page={+page}
        />
    );
};

export default ForumTopicData;
