import React, { FC, MouseEventHandler, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '@components/ui/button/button';
import style from './forum.module.scss';
import MockServer from '@/mocks/mock-server';
import { dateFormat, FormatType } from '@/helpers/dateformat';
import msgIcon from '@/assets/images/message_icon.png';
import Input from '@/components/ui/input/input';
import TextArea from '@/components/ui/textarea/textarea';
import Pagination from '@/components/ui/pagination/pagination';
import Modal from '@/components/ui/modal/modal';

const Forum: FC = () => {
    type FormFields = {
        topicName: HTMLInputElement;
        topicMsg: HTMLTextAreaElement;
    };

    const { page = 1 } = useParams();
    const [newTopicModal, setNewTopicModal] = useState(false);

    const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = event => {
        event.preventDefault();
        const form = event.currentTarget;
        const { topicName, topicMessage } = form;
        console.log('Отправили данные формы', topicName.value, topicMessage.value);
        setNewTopicModal(false);
        topicName.value = '';
        topicMessage.value = '';
    };

    const handleNewTopic: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setNewTopicModal(true);
    };
    const handleCloseModal: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setNewTopicModal(false);
    };

    const MAX_ELEMENTS_PER_PAGE = 10;
    const server = new MockServer();
    const serverData = server.getTopicList(+page, MAX_ELEMENTS_PER_PAGE);

    return (
        <main className={style.main}>
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
            <Modal isActive={newTopicModal}>
                <span className={style.modalTitle}>Создание новой темы форума</span>
                <form onSubmit={handleSubmit}>
                    <div className={style['topicName-wrapper']}>
                        <Input label="Название темы" name="topicName" />
                    </div>
                    <TextArea rows={6} cols={50} label="Вашe сообщение" name="topicMessage" />
                    <div className={style['button-wrap']}>
                        <Button onClick={handleCloseModal} buttonSize="medium">
                            Отмена
                        </Button>
                        <Button type="submit" buttonSize="medium">
                            Создать
                        </Button>
                    </div>
                </form>
            </Modal>
        </main>
    );
};

export default Forum;
