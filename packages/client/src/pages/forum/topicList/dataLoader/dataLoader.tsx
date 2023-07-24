import React, { FC, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import Page from '@/pages/forum/topicList/page/page';
import { Loader } from '@/components/ui';
// import { setForumTopics } from '@/store/slices/forumSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/store';

import forumApi from '@/api/ForumApi';
import { TTopicListData } from '@/types/forumDataTypes';

const Forum: FC = () => {
    console.log('render data loader');
    // const { page = 1 } = useParams();
    const page = 1; // temp for testing number of loads
    const MAX_ELEMENTS_PER_PAGE = 10;
    const [forumData, setForumData] = useState<TTopicListData>();
    // const dispatch = useDispatch();
    // const forumState = useSelector((state: RootState) => state.forum);
    // const { forum } = forumState;
    useEffect(() => {
        forumApi.getTopics(
            +page,
            MAX_ELEMENTS_PER_PAGE,
            (data: TTopicListData) => {
                console.log('set forum data');
                console.log(data.topics);
                setForumData(data);
                // console.log(forumData);

                /* dispatch(
                    setForumTopics({
                        ...forum,
                        forumTopics: data.topics,
                    })
                ); */
            },
            // eslint-disable-next-line
            () => {}
        );
    }, []); // [dispatch]);

    if (!forumData) {
        return <Loader />;
    }
    return <Page topics={forumData.topics} page={+page} lastPage={forumData.lastPage} />;
};

export default Forum;
