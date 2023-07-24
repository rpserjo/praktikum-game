import React, { FC, useState } from 'react';
import style from './message.module.scss';
import { FormatType, dateFormat } from '@/helpers/dateformat';
import userSceleton from '@/assets/images/user-sceleton.png';
import { Button, Icon } from '@/components/ui';
import { TTopicForSave, TTopicMessage, TTopicMessageForSave } from '@/types/forumDataTypes';
import { MessageList } from '../messageList/messageList';
import { ForumModal } from '../../common/modal/forumModal';
import forumApi from '@/api/ForumApi';
import { Emoji } from '../../common/emoji/emoji';

type TMessageProps = {
    // eslint-disable-next-line
    message: TTopicMessage;
    // eslint-disable-next-line
    replies: TTopicMessage[];
    // eslint-disable-next-line
    isComment?: boolean; // can be comment or reply
};

export const Message: FC<TMessageProps> = messageData => {
    const [isRepliesOpened, setIsRepliesOpened] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const { message, replies, isComment = true } = messageData;

    const toggleReplies = () => {
        setIsRepliesOpened(!isRepliesOpened);
    };

    const handleReplySaved = (reply: TTopicMessage) => {
        console.log('saved');
        console.log(reply);
    };

    const handleReplySaveError = (error: string) => {
        console.log(error);
    };

    const submitMessage = (data: TTopicMessageForSave | TTopicForSave) => {
        const replyData = data as TTopicMessageForSave;
        if (replyData) {
            console.log(
                'Save reply to comment with text and comment id',
                replyData.text,
                replyData.id
            );
            // todo spinner while saving!!
            forumApi.saveReply(replyData, handleReplySaved, handleReplySaveError);
        } else {
            // todo error
            console.log('error type');
        }
    };

    // todo key prop fix
    return (
        <>
            <div key={message.id} className={style.message}>
                <div className={style.message__body}>
                    <div className={style.message__info}>
                        <img
                            className={style.message__avatar}
                            src={userSceleton}
                            alt="user sceleton"
                        />
                        <p className={style.message__author}>{message.author}</p>
                        <p>{dateFormat(message.createdDate, FormatType.DATE_TIME)}</p>
                    </div>
                    <p className={style.message__text}>{message.text}</p>
                </div>
                <div className={style.message__actions}>
                    <div className={style.message__reply}>
                        {isComment && (
                            <Button onClick={() => setIsModalActive(true)} buttonSize="small">
                                Ответить
                            </Button>
                        )}
                        <Emoji messageId={message.id} />
                    </div>
                    {isComment && (
                        <p className={style.message__reply}>
                            <Button
                                buttonSize="small"
                                buttonStyle="outlined"
                                customStyle={style.message__open}
                                onClick={toggleReplies}
                            >
                                <Icon iconName="plus" width={20} height={20} />
                            </Button>
                            {isRepliesOpened ? 'Свернуть ветку' : 'Раскрыть ветку'}
                        </p>
                    )}
                </div>
                {isComment && isRepliesOpened && (
                    <div className={style.message__replyList}>
                        <MessageList messages={replies} isCommentsList={false} />
                    </div>
                )}
            </div>
            {isComment && (
                <ForumModal
                    id={message.id}
                    isActive={isModalActive}
                    setIsActive={setIsModalActive}
                    submit={submitMessage}
                    isTopicForm={false}
                    rows={10}
                    modalTitle="Новое сообщение в обсуждение"
                />
            )}
        </>
    );
};
