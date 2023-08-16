import React, { FC } from 'react';
import { TTopicReply } from '@/types/forumDataTypes';
import { Reply } from '../reply/reply';

type TRepliesList = {
    replies: TTopicReply[];
};

export const RepliesList: FC<TRepliesList> = ({ replies }) => (
    <>
        {replies.map(item => (
            <Reply key={item.id} message={item} />
        ))}
    </>
);
