import React, { FC } from 'react';
import style from './topicPage.module.scss';
import { TopicInfo } from './topicInfo/topicInfo';
import { CommentList } from './commentList/commentList';

const ForumTopic: FC = () => (
    <main className={style.main}>
        <div className={style.content}>
            <TopicInfo />
            <CommentList />
        </div>
    </main>
);

export default ForumTopic;
