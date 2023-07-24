import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '@/components/ui';
import ForumTopic from '../page/page';
import { TCommentListData, TTopic } from '@/types/forumDataTypes';
import forumApi from '@/api/ForumApi';

const ForumTopicData: FC = () => {
    const MAX_ELEMENTS_PER_PAGE = 10;
    const { page = 1, topicId } = useParams();
    const [topic, setTopic] = useState<TTopic>();
    const [commentsData, setCommentsData] = useState<TCommentListData>();

    useEffect(() => {
        forumApi.getTopic(
            +topicId!,
            (data: TTopic) => {
                setTopic(data);
            },
            error => {
                console.log(error);
            }
        );

        forumApi.getComments(+topicId!, +page, MAX_ELEMENTS_PER_PAGE, (data: TCommentListData) => {
            setCommentsData(data);
        });
    }, []);

    if (!topic || !commentsData) {
        return <Loader />;
    }
    return (
        <ForumTopic
            topic={topic}
            comments={commentsData.comments}
            lastPage={commentsData.lastPage}
            page={+page}
        />
    );
};

export default ForumTopicData;
