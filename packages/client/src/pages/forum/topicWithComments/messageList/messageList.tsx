import React, { FC } from 'react';
import style from './messageList.module.scss';
import { TTopicMessage } from '@/types/data-types';
import { Message } from '../message/message';

type TMessageList = {
    // eslint-disable-next-line
    messages: TTopicMessage[];
    // eslint-disable-next-line
    isCommentsList?: boolean;
};

export const MessageList: FC<TMessageList> = data => {
    const { messages, isCommentsList = true } = data;
    // todo move, this is for testing markup
    // add getReplies method
    const replies = new Array<TTopicMessage>({
        id: 1,
        author: 'Anna',
        createdDate: '2023-05-22T12:51:00',
        text: 'My comment',
    });
    return (
        <div className={style.comments}>
            {messages.map(item => (
                <Message message={item} replies={replies} isComment={isCommentsList} />
            ))}
        </div>
    );
};
