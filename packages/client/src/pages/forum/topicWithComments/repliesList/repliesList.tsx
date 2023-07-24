import React, { FC } from 'react';
import style from './repliesList.module.scss';
import { TTopicReply } from '@/types/forumDataTypes';
import { Reply } from '../reply/reply';

type TRepliesList = {
    // eslint-disable-next-line
    replies: TTopicReply[];
};

export const RepliesList: FC<TRepliesList> = data => {
    const { replies } = data;
    return (
        <div className={style.comments}>
            {replies.map(item => (
                <Reply message={item} />
            ))}
        </div>
    );
};
