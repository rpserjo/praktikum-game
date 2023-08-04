import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './topic.module.scss';
import { dateFormat, FormatType } from '@/helpers/dateformat';
import { TTopic } from '@/types/forumDataTypes';
import msgIcon from '@/assets/images/message_icon.png';

type TTopicProps = {
    topic: TTopic;
};

export const Topic: FC<TTopicProps> = ({ topic }) => (
    <div className={style.topic}>
        <div className={style.topic__shortInfo}>
            <Link to={`/forum-topic/${topic.id}/1`} className={style.topic__title}>
                {topic.title}
            </Link>
            <span className={style.topic__author}>
                {`Автор: ${topic.author} -   ${dateFormat(
                    topic.createdDate,
                    FormatType.DATE_TIME
                )}`}
            </span>
        </div>
        <div className={style.topic__commentsInfo}>
            <img className={style.topic__commentsIcon} src={msgIcon} alt="comments" />
            <span className={style.topic__commentsCount}>{topic.commentsCount}</span>
        </div>
        <div className={style.topic__lastCommentDate}>
            {dateFormat(topic.lastCommentDate, FormatType.DATE)}
        </div>
    </div>
);
