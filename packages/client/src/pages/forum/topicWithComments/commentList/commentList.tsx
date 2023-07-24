import React, { FC } from 'react';
import style from './commentList.module.scss';
import { TTopicComment, TTopicReply } from '@/types/forumDataTypes';
import { Message } from '../comment/comment';

type TCommentListProps = {
    // eslint-disable-next-line
    messages: TTopicComment[];
};

export const MessageList: FC<TCommentListProps> = data => {
    const { messages } = data;
    // todo move, this is for testing markup
    // add getReplies method
    const replies = new Array<TTopicReply>({
        id: 1,
        author: 'Anna',
        createdDate: '2023-05-22T12:51:00',
        text: 'My comment',
        authorAvatar: null,
        commentId: 1,
    });
    return (
        <div className={style.comments}>
            {messages.map(item => (
                <Message message={item} replies={replies} />
            ))}
        </div>
    );
};
