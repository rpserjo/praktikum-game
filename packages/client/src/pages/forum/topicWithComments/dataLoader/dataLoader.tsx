import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MockServer from '@/mocks/mock-server';
import { Loader } from '@/components/ui';
import ForumTopic from '../page/page';
import { TTopicInfo, TTopicMessage } from '@/types/forumDataTypes';
import forumApi from '@/api/ForumApi';

const ForumTopicData: FC = () => {
    const MAX_ELEMENTS_PER_PAGE = 10;
    const { page = 1, topicId } = useParams();
    const [topic, setTopic] = useState<TTopicInfo>();
    const [comments, setComments] = useState<TTopicMessage[]>();

    // todo replace with real
    const server = new MockServer();
    const serverData = server.getTopicWithComments(+topicId!, +page, MAX_ELEMENTS_PER_PAGE); // todo check all models

    useEffect(() => {
        forumApi.getTopic(
            +topicId!,
            (data: TTopicInfo) => {
                setTopic(data);
            },
            error => {
                console.log(error);
            }
        );

        forumApi.getComments(+topicId!, +page, MAX_ELEMENTS_PER_PAGE, (data: TTopicMessage[]) => {
            setComments(data);
        });
    }, []);

    if (!serverData || !topic || !comments) {
        return <Loader />;
    }
    return (
        <ForumTopic topic={topic} comments={comments} lastPage={serverData.lastPage} page={+page} />
    );
};

export default ForumTopicData;
