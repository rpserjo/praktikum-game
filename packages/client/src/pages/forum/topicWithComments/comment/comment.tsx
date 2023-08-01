import React, { FC, useState } from 'react';
// import { useDispatch } from 'react-redux';
import Emojis from '@components/ui/emojis/emojis';
import style from '../common.module.scss';
import commentStyle from './comment.module.scss';
import { FormatType, dateFormat } from '@/helpers/dateformat';
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
import { calcAvatarUrl } from '@/helpers/avatarHelper';

type TMessageProps = {
    message: TTopicComment;
};

export const Message: FC<TMessageProps> = ({ message }) => {
    const [isRepliesOpened, setIsRepliesOpened] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    // const dispatch = useDispatch();

    const toggleReplies = () => {
        setIsRepliesOpened(!isRepliesOpened);
    };

    const handleReplySaved = (reply: TTopicReply) => {
        console.log('saved');
        console.log(reply);
        // const clone = {...message};
        // dispatch(setTopicComments(cloneTopic));
    };

    const handleReplySaveError = (error: string) => {
        console.log(error);
    };

    const submitReply = (data: TTopicMessageForSave | TTopicForSave) => {
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
            console.log('Error: Type of the object is not a reply.');
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
                            src={calcAvatarUrl(message.authorAvatar)}
                            alt="avatar"
                        />
                        <p className={style.message__author}>{message.author}</p>
                        <p>{dateFormat(message.createdDate, FormatType.DATE_TIME)}</p>
                    </div>
                    <p className={style.message__text}>{message.text}</p>
                </div>
                <div className={style.message__actions}>
                    <div className={commentStyle.message__reply}>
                        <Button onClick={() => setIsModalActive(true)} buttonSize="small">
                            Ответить
                        </Button>
                        <Emojis messageId={message.id} />
                    </div>
                    {message.replies.length !== 0 && (
                        <p className={commentStyle.message__reply}>
                            <Button
                                buttonStyle="outlinedSmall"
                                buttonSize="no"
                                onClick={toggleReplies}
                            >
                                <Icon iconName="plus" width={20} height={20} />
                            </Button>
                            {isRepliesOpened ? 'Свернуть ветку' : 'Раскрыть ветку'}
                        </p>
                    )}
                </div>
                {isRepliesOpened && (
                    <div className={commentStyle.message__replyList}>
                        <RepliesList replies={message.replies} />
                    </div>
                )}
            </div>
            <ForumModal
                id={message.id}
                isActive={isModalActive}
                setIsActive={setIsModalActive}
                submit={submitReply}
                isTopicForm={false}
                rows={10}
                modalTitle="Новое сообщение в обсуждение"
            />
        </>
    );
};
