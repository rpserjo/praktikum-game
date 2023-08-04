import React, { FC } from 'react';
import style from './commentList.module.scss';
import { TTopicComment } from '@/types/forumDataTypes';
import { Message } from '../comment/comment';

type TCommentListProps = {
    messages: TTopicComment[];
};

export const MessageList: FC<TCommentListProps> = ({ messages }) => (
    <div className={style.comments}>
        {messages.map(item => (
            <Message key={item.id} message={item} />
        ))}
    </div>
);
