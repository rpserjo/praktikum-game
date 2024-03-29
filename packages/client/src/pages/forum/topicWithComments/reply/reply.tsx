import React, { FC } from 'react';
import style from '../common.module.scss';
import { FormatType, dateFormat } from '@/helpers/dateformat';
import { TTopicReply } from '@/types/forumDataTypes';
import Emojis from '@/components/ui/emojis/emojis';
import { calcAvatarUrl } from '@/helpers/avatarHelper';

type TMessageProps = {
    message: TTopicReply;
};

export const Reply: FC<TMessageProps> = ({ message }) => (
    <div className={style.message}>
        <div className={style.message__body}>
            <div className={style.message__info}>
                <img
                    className={style.message__avatar}
                    src={calcAvatarUrl(message.authorAvatar)}
                    alt="avatar"
                />
                <p className={style.message__author}>{message.author}</p>
                <p>{dateFormat(message.replyCreatedAt, FormatType.DATE_TIME)}</p>
            </div>
            <p className={style.message__text}>{message.message}</p>
        </div>
        <div className={style.message__actions}>
            <Emojis messageId={message.id} />
        </div>
    </div>
);
