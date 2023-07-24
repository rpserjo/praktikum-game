import React, { FC, useState } from 'react';
import Emojis from '@components/ui/emojis/emojis';
import style from './comment.module.scss';
import { FormatType, dateFormat } from '@/helpers/dateformat';
import userSceleton from '@/assets/images/user-sceleton.png';
import { Button, Icon } from '@/components/ui';
import {
    TTopicComment,
    TTopicForSave,
    TTopicMessageForSave,
    TTopicReply,
} from '@/types/forumDataTypes';
import { ForumModal } from '../../common/modal/forumModal';
import forumApi from '@/api/ForumApi';
import { RepliesList } from '../repliesList/repliesList';

type TMessageProps = {
    // eslint-disable-next-line
    message: TTopicComment;
};

export const Message: FC<TMessageProps> = messageData => {
    const [isRepliesOpened, setIsRepliesOpened] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const { message } = messageData;

    const toggleReplies = () => {
        setIsRepliesOpened(!isRepliesOpened);
    };

    const handleReplySaved = (reply: TTopicReply) => {
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
                replyData.parentId
            );
            // todo spinner while saving!!
            forumApi.saveReply(replyData, handleReplySaved, handleReplySaveError);
        } else {
            // todo error
            console.log('error type');
        }
    };

    // todo move, this is for testing markup
    // add getReplies method
    /* const replies = new Array<TTopicReply>({
        id: 1,
        commentId: 1,
        author: 'Anna',
        createdDate: '2023-05-22T12:51:00',
        text: 'My comment',
        authorAvatar: null,
    }); */

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
                        <Button onClick={() => setIsModalActive(true)} buttonSize="small">
                            Ответить
                        </Button>
                        <Emojis messageId={message.id} />
                    </div>
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
                </div>
                {isRepliesOpened && (
                    <div className={style.message__replyList}>
                        <RepliesList replies={message.replies} />
                    </div>
                )}
            </div>
            <ForumModal
                id={message.id}
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
