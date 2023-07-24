import React, { FC } from 'react';
import style from './reply.module.scss';
import defaultAvatar from '@/assets/images/user-sceleton.png';
import { FormatType, dateFormat } from '@/helpers/dateformat';
import { TTopicReply } from '@/types/forumDataTypes';
import Emojis from '@/components/ui/emojis/emojis';

type TMessageProps = {
    // eslint-disable-next-line
    message: TTopicReply;
};

// todo move common styles to separate file
// todo key prop fix

export const Reply: FC<TMessageProps> = ({ message }) => (
    <div key={message.id} className={style.message}>
        <div className={style.message__body}>
            <div className={style.message__info}>
                <img className={style.message__avatar} src={defaultAvatar} alt="avatar" />
                <p className={style.message__author}>{message.author}</p>
                <p>{dateFormat(message.createdDate, FormatType.DATE_TIME)}</p>
            </div>
            <p className={style.message__text}>{message.text}</p>
        </div>
        <div className={style.message__actions}>
            <Emojis messageId={message.id} />
        </div>
    </div>
);
