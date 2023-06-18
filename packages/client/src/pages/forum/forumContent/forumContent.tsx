import React, { FC, MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/button/button';
import { FormatType, dateFormat } from '@/helpers/dateformat';
import msgIcon from '@/assets/images/message_icon.png';
import Pagination from '@/components/ui/pagination/pagination';
import { TTopicServerData } from '@/types/data-types';
import style from '../forum.module.scss';
import ForumModal from '@/pages/forum/modal/modal';

type ForumContentProps = {
    serverData: TTopicServerData;
    page: number;
};
type FormFields = {
    topicName: HTMLInputElement;
    topicMsg: HTMLTextAreaElement;
};
const ForumContent: FC<ForumContentProps> = ({ serverData, page }) => {
    const [newTopicModal, setNewTopicModal] = useState(false);

    const handleNewTopic: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setNewTopicModal(true);
    };
    const handleCloseModal: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setNewTopicModal(false);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = event => {
        event.preventDefault();
        const form = event.currentTarget;
        const { topicName, topicMessage } = form;
        console.log('Отправили данные формы', topicName.value, topicMessage.value);
        setNewTopicModal(false);
        topicName.value = '';
        topicMessage.value = '';
    };

    return (
        <>
            <div className={style.content}>
                <h1 className={style.h1}>Форум</h1>
                <div className={style['btn-them-wrap']}>
                    <Button onClick={handleNewTopic} buttonSize="medium">
                        Новая тема
                    </Button>
                </div>
                <div className={style['topics-list']}>
                    {serverData.items.map(item => (
                        <div key={item.topicId} className={style['topic-row-wrapper']}>
                            <div className={style['topic-present']}>
                                <Link
                                    to={`/forum-topic/${item.topicId}/1`}
                                    className={style['topic-name']}
                                >
                                    {item.topic}
                                </Link>
                                <span className={style['topic-author']}>
                                    {`Автор: ${item.author} -   ${dateFormat(
                                        item.createDate,
                                        FormatType.DATE_TIME
                                    )}`}
                                </span>
                            </div>
                            <div className={style['qty-message-wrapper']}>
                                <img
                                    className={style['qty-message-img']}
                                    src={msgIcon}
                                    alt="message logo"
                                />
                                <span className={style['qty-message-span']}>{item.messageQty}</span>
                            </div>
                            <div className={style['last-message-date']}>
                                {dateFormat(item.dateLastMessage, FormatType.DATE)}
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination currentPage={+page} lastPage={serverData.lastPage} linkPath="/forum/" />
            </div>
            <ForumModal
                newTopicModal={newTopicModal}
                handleSubmit={handleSubmit}
                handleCloseModal={handleCloseModal}
            />
        </>
    );
};

export default ForumContent;
