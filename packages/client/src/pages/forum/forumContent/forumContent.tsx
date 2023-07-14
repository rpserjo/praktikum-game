import React, { FC, FormEventHandler, MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/button/button';
import { FormatType, dateFormat } from '@/helpers/dateformat';
import msgIcon from '@/assets/images/message_icon.png';
import Pagination from '@/components/ui/pagination/pagination';
import { TTopicServerData } from '@/types/data-types';
import style from '../forum.module.scss';
import Modal from '@/components/ui/modal/modal';
import TopicForm from '@/pages/forum/topicForm/topicForm';

type ForumContentProps = {
    serverData: TTopicServerData;
    page: number;
};
type FormFields = {
    topicName: HTMLInputElement;
    topicMsg: HTMLTextAreaElement;
};
const ForumContent: FC<ForumContentProps> = ({ serverData, page }) => {
    const [showNewTopicModal, setShowNewTopicModal] = useState(false);

    const handleNewTopic: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setShowNewTopicModal(true);
    };
    const closeModal: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setShowNewTopicModal(false);
    };
    const handleSubmit: FormEventHandler<HTMLFormElement & FormFields> = event => {
        event.preventDefault();
        const form = event.currentTarget;
        const { topicName, topicMessage } = form;
        console.log('Отправили данные формы', topicName.value, topicMessage.value);
        setShowNewTopicModal(false);
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
            <Modal isActive={showNewTopicModal}>
                <TopicForm handleSubmit={handleSubmit} handleCloseModal={closeModal} />
            </Modal>
        </>
    );
};
export default ForumContent;
