import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Page from '@/pages/forum/topicList/page/page';
import { Loader } from '@/components/ui';
// import { setForumTopics } from '@/store/slices/forumSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/store';

import ForumApi from '@/api/ForumApi';

const Forum: FC = () => {
    const { page = 1 } = useParams();

    const MAX_ELEMENTS_PER_PAGE = 10;

    const forumApi = new ForumApi();
    const forumData = forumApi.getTopics(+page, MAX_ELEMENTS_PER_PAGE);

    // todo where should we do this?
    /* const dispatch = useDispatch();
    const forumState = useSelector((state: RootState) => state.forum);
    const { forum } = forumState;
    dispatch(
        setForumTopics({
            ...forum,
            forumTopics: forumData.topics,
        })
    ); */

    if (!forumData) {
        return <Loader />;
    }
    return <Page topics={forumData.topics} page={+page} lastPage={forumData.lastPage} />;
};

export default Forum;
