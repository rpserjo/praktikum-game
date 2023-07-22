import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MockServer from '@/mocks/mock-server';
import { Loader } from '@/components/ui';
import ForumTopic from '../page/page';
import { TTopicInfo, TTopicListData, TTopicMessage } from '@/types/data-types';
import forumApi from '@/api/ForumApi';

const ForumTopicData: FC = () => {
    const MAX_ELEMENTS_PER_PAGE = 10;
    const { page = 1, topicId } = useParams();
    console.log('topic id ' + topicId);
    const [topic, setTopic] = useState<TTopicInfo>();
    const [comments, setComments] = useState<TTopicMessage[]>();

    // todo replace with real
    const server = new MockServer();
    const serverData = server.getTopicWithComments(+topicId!, +page, MAX_ELEMENTS_PER_PAGE); // todo check all models

    /* const forumApi = forumApi();
    const topicDataReal = forumApi.getTopic(+topicId!); */

    useEffect(() => {
        /* forumApi.getTopic(+topicId!, (data: TTopicInfo) => {
            console.log('set topic data');
            console.log(data);
            setTopic(data);
        }); */
        forumApi.getTopics(
            +page,
            10,
            (data: TTopicListData) => {
                setTopic(data.topics.find(item => item.id === +topicId!));
            },
            error => {
                console.log(error);
            }
        );

        forumApi.getComments(+topicId!, +page, MAX_ELEMENTS_PER_PAGE, (data: TTopicMessage[]) => {
            console.log('setting comments to state');
            console.log(data);
            setComments(data);
            console.log(comments);
        });
    }, []);

    if (!serverData || !topic) {
        return <Loader />;
    }
    return (
        <ForumTopic
            topic={topic}
            comments={serverData.comments}
            lastPage={serverData.lastPage}
            page={+page}
        />
    );
};

export default ForumTopicData;
