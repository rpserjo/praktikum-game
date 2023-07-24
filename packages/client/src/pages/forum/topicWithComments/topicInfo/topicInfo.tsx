import React, { FC, useState } from 'react';
import style from './topicInfo.module.scss';
import { FormatType, dateFormat } from '@/helpers/dateformat';
import userSceleton from '@/assets/images/user-sceleton.png';
import {
    TTopicForSave,
    TTopicInfo,
    TTopicMessage,
    TTopicMessageForSave,
} from '@/types/forumDataTypes';
import { Button, Icon } from '@/components/ui';
import { ForumModal } from '../../common/modal/forumModal';
import forumApi from '@/api/ForumApi';
import { Emoji } from '../../common/emoji/emoji';

type TTopicInfoProps = {
    info: TTopicInfo;
};

export const TopicInfo: FC<TTopicInfoProps> = props => {
    const { info } = props;
    const [isModalActive, setIsModalActive] = useState(false);

    const handleCommentSaved = (comment: TTopicMessage) => {
        console.log('here we need to refresh list');
        // hide spinner in modal and hide modal
        console.log(comment);
    };

    const handleCommentSaveError = (error: string) => {
        console.log(error);
    };

    const submitMessage = (data: TTopicMessageForSave | TTopicForSave) => {
        const commentData = data as TTopicMessageForSave;
        if (commentData) {
            console.log('Save comment with text and topic id', commentData.text, commentData.id);
            // todo spinner while saving!!
            forumApi.saveComment(commentData, handleCommentSaved, handleCommentSaveError);
            // todo refresh list + message comment saved
        } else {
            console.log('error'); // todo
        }
    };

    return (
        <>
            <div className={style.topic}>
                <div className={style.topic__info}>
                    <img className={style.topic__avatar} src={userSceleton} alt="user avatar" />
                    <p className={style.topic__author}>{info.author}</p>
                    <p>{dateFormat(info.createdDate, FormatType.DATE)}</p>
                </div>
                <h1 className={style.topic__title}>{info.title}</h1>
                <p className={style.topic__message}>{info.message}</p>
                <div className={style.topic__info}>
                    <div className={style.topic__comments}>
                        <Icon iconName="comment" height={30} width={30} />
                        <p>{info.commentsCount}</p>
                    </div>
                    <Button onClick={() => setIsModalActive(true)} buttonSize="small">
                        Добавить комментарий
                    </Button>
                    <Emoji messageId={info.id} />
                </div>
            </div>
            <ForumModal
                id={info.id}
                isActive={isModalActive}
                setIsActive={setIsModalActive}
                submit={submitMessage}
                isTopicForm={false}
                rows={10}
                modalTitle="Новое сообщение в обсуждение"
            />
        </>
    );
};
