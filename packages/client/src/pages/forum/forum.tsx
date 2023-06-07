import React, { FC, MouseEventHandler, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import Button from '@components/ui/button/button';
import style from './forum.module.scss';
import MockServer from '@/mocks/mock-server';
import { dateFormat, FormatType } from '@/helpers/dateformat';
import msgIcon from '@/assets/images/message_icon.png';
import Input from '@/components/ui/input/input';
import TextArea from '@/components/ui/textarea/textarea';

const Forum: FC = () => {
    type FormFields = {
        topicName: HTMLInputElement;
        topicMsg: HTMLTextAreaElement;
    };

    const { page = 1 } = useParams();
    const [newTopicModal, setNewTopicModal] = useState(false);

    const newTopicModalClasses = cn(style.newTopicModal, {
        [style.active]: newTopicModal,
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = event => {
        event.preventDefault();
        const form = event.currentTarget;
        const { topicName, topicMsg } = form;
        console.log('Отправили данные формы', topicName.value, topicMsg.value);
        setNewTopicModal(false);
        topicName.value = '';
        topicMsg.value = '';
    };

    const handleNewTopic: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setNewTopicModal(true);
    };
    const handleCloseModal: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setNewTopicModal(false);
    };

    const server = new MockServer();
    const topicData = server.getTopicList();

    const items = topicData.slice((+page! - 1) * 10, +page! * 10);
    const isShowPrev = page && +page > 1 ? true : undefined;

    const lastPage = Math.ceil(topicData.length / 10);
    const isShowNext = page && +page < lastPage ? true : undefined;

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
                    {items.map(item => (
                        <div key={item.topicId} className={style['topic-row-wrapper']}>
                            <div className={style['topic-present']}>
                                <Link to={`/forum-topic/${item.topicId}/1`} className={style['topic-name']}>
                                    {item.topic}
                                </Link>
                                <span className={style['topic-author']}>{`Автор: ${item.author} -   ${dateFormat(item.createDate, FormatType.DATE_TIME)}`}</span>
                            </div>
                            <div className={style['qty-message-wrapper']}>
                                <img className={style['qty-message-img']} src={msgIcon} alt="message logo" />
                                <span className={style['qty-message-span']}>{item.msgQty}</span>
                            </div>
                            <div className={style['last-message-date']}>{dateFormat(item.dateLstMsg, FormatType.DATE)}</div>
                        </div>
                    ))}
                </div>
                <div className={style['wrapper-links']}>
                    {isShowPrev && (
                        <Link className={style.link} to={`/forum/${Number(page) - 1}`}>
                            Prev
                        </Link>
                    )}
                    <span>{`< ${page} >`}</span>
                    {isShowNext && (
                        <Link className={style.link} to={`/forum/${Number(page) + 1}`}>
                            Next
                        </Link>
                    )}
                </div>
            </div>
            <div className={newTopicModalClasses}>
                <div className={style.modalContent}>
                    <span className={style.modalTitle}>Создание новой темы форума</span>
                    <form onSubmit={handleSubmit}>
                        <Input classNameWrap={style['topicName-wrapper']} label="Название темы" nameElement="topicName" />
                        <TextArea rows={6} cols={50} label="Вашe сообщение" nameElement="topicMsg" />
                        <div className={style['button-wrap']}>
                            <Button onClick={handleCloseModal} buttonSize="medium">
                                Отмена
                            </Button>
                            <Button type="submit" buttonSize="medium">
                                Создать
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Forum;
