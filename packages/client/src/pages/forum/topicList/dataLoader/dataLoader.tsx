import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import MockServer from '@/mocks/mock-server';
import Page from '@/pages/forum/topicList/page/page';
import { Loader } from '@/components/ui';
// import ForumApi from '@/api/ForumApi';
// import { TTopicInfo } from '@/types/data-types';

const Forum: FC = () => {
    const { page = 1 } = useParams();

    const MAX_ELEMENTS_PER_PAGE = 10;
    // todo remove and review models
    const server = new MockServer();
    const serverData = server.getTopicListNew(+page, MAX_ELEMENTS_PER_PAGE);

    /* const forumApi = new ForumApi();
    const topicDataReal = forumApi.getTopics(+page, MAX_ELEMENTS_PER_PAGE); */

    if (!serverData) {
        return <Loader />;
    }
    return <Page topics={serverData.topics} page={+page} lastPage={serverData.lastPage} />;
};

export default Forum;
