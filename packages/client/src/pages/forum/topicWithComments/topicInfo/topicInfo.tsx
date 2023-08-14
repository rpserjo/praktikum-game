import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './topicInfo.module.scss';
import { FormatType, dateFormat } from '@/helpers/dateformat';
import { TTopicForSave, TTopicMessageForSave } from '@/types/forumDataTypes';
import { Button, Icon, Loader } from '@/components/ui';
import { ForumModal } from '../../common/modal/forumModal';
import forumApi from '@/api/ForumApi';
import Emojis from '@/components/ui/emojis/emojis';
import { calcAvatarUrl } from '@/helpers/avatarHelper';
import { RootState, useAppDispatch } from '@/store';
import { fetchTopicComments, fetchTopicInfo } from '@/store/slices/forumSlice';

export const TopicInfo: FC = () => {
    const { page = 1, topicId } = useParams();
    const [isModalActive, setIsModalActive] = useState(false);
    const dispatch = useAppDispatch();

    const { topic } = useSelector((state: RootState) => state.forum.topicInfo);

    useEffect(() => {
        // if (topicLoadStatus === TFetchStatus.IDLE && topicId) {
        if (topicId) {
            dispatch(fetchTopicInfo(+topicId));
        }
    }, [topicId]);

    const handleCommentSaved = () => {
        if (topicId) {
            dispatch(fetchTopicComments({ topicId: +topicId, page: +page }));
        }
        // todo concat comments for loading lots of data
    };

    const handleCommentSaveError = (error: string) => {
        console.log(error);
    };

    const submitMessage = (data: TTopicMessageForSave | TTopicForSave) => {
        const commentData = data as TTopicMessageForSave;
        if (commentData) {
            // todo spinner while saving!! + message comment saved
            forumApi.saveComment(commentData, handleCommentSaved, handleCommentSaveError);
        } else {
            console.log('No comment data provided for saving');
        }
    };
    // todo increment commnets count!
    if (topic) {
        return (
            <>
                <div className={style.topic}>
                    <div className={style.topic__info}>
                        <img
                            className={style.topic__avatar}
                            src={calcAvatarUrl(topic.authorAvatar)}
                            alt="user avatar"
                        />
                        <p className={style.topic__author}>{topic.author}</p>
                        <p>{dateFormat(topic.createdDate, FormatType.DATE)}</p>
                    </div>
                    <h1 className={style.topic__title}>{topic.title}</h1>
                    <p className={style.topic__message}>{topic.message}</p>
                    <div className={style.topic__info}>
                        <div className={style.topic__comments}>
                            <Icon iconName="comment" height={30} width={30} />
                            <p>{topic.commentsCount}</p>
                        </div>
                        <Button onClick={() => setIsModalActive(true)} buttonSize="small">
                            Добавить комментарий
                        </Button>
                        <Emojis messageId={topic.id} />
                    </div>
                </div>
                <ForumModal
                    id={topic.id}
                    isActive={isModalActive}
                    setIsActive={setIsModalActive}
                    submit={submitMessage}
                    isTopicForm={false}
                    rows={10}
                    modalTitle="Новое сообщение в обсуждение"
                />
            </>
        );
    }
    return <Loader />;
};
