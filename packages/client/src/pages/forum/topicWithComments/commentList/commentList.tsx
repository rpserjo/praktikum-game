import React, { FC } from 'react';
import style from './commentList.module.scss';
import { TTopicComment } from '@/types/forumDataTypes';
import { Message } from '../comment/comment';

type TCommentListProps = {
    // eslint-disable-next-line
    messages: TTopicComment[];
};

export const MessageList: FC<TCommentListProps> = data => {
    const { messages } = data;
    return (
        <div className={style.comments}>
            {messages.map(item => (
                <Message message={item} />
            ))}
        </div>
    );
};
