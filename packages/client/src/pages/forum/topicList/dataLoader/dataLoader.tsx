import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Page from '@/pages/forum/topicList/page/page';
import { Loader } from '@/components/ui';
import { setTopicList } from '@/store/slices/forumSlice';
import { RootState } from '@/store';

import forumApi from '@/api/ForumApi';
import { TTopicListData } from '@/types/forumDataTypes';

const Forum: FC = () => {
    console.log('render data loader');
    const { page = 1 } = useParams(); // temp check multiple reloads ?
    const MAX_ELEMENTS_PER_PAGE = 10;

    const dispatch = useDispatch();
    const forumState = useSelector((state: RootState) => state.forum);
    const { topicList } = forumState.forum;

    console.log('forumState.forum.forumTopics');
    console.log(topicList);

    useEffect(() => {
        forumApi.getTopics(
            +page,
            MAX_ELEMENTS_PER_PAGE,
            (data: TTopicListData) => {
                console.log('in use effect');
                console.log(data);
                dispatch(setTopicList(data));
            },
            (error: string) => {
                console.log(error);
            }
        );
    }, [dispatch]);

    if (!topicList) {
        return <Loader />;
    }
    return <Page topics={topicList.topics} page={+page} lastPage={topicList.lastPage} />;
};

export default Forum;
