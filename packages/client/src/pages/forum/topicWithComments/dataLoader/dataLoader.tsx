import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import MockServer from '@/mocks/mock-server';
import { Loader } from '@/components/ui';
import ForumTopic from '../page/page';
// import ForumApi from '@/api/ForumApi';

const ForumTopicData: FC = () => {
    const MAX_ELEMENTS_PER_PAGE = 10;
    const { page = 1, topicId } = useParams();

    // todo replace with real
    const server = new MockServer();
    const serverData = server.getTopicWithComments(+topicId!, +page, MAX_ELEMENTS_PER_PAGE); // todo check all models

    /* const forumApi = new ForumApi();
    const topicDataReal = forumApi.getTopic(+topicId!); */

    if (!serverData) {
        return <Loader />;
    }
    return (
        <ForumTopic
            topic={serverData.topic}
            comments={serverData.comments}
            lastPage={serverData.lastPage}
            page={+page}
        />
    );
};

export default ForumTopicData;
