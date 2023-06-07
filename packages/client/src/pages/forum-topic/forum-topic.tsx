import React, { FC, MouseEventHandler, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import Button from '@components/ui/button/button';
import style from './forum-topic.module.scss';
import MockServer from '@/mocks/mock-server';
import { dateFormat, FormatType } from '@/helpers/dateformat';
import TextArea from '@/components/ui/textarea/textarea';
import userSceleton from '@/assets/images/user-sceleton.png';

const ForumTopic: FC = () => {
    type FormFields = {
        topicMsg: HTMLInputElement;
    };

    const { page = 1, topicId } = useParams();
    const [newMsgModal, setNewTopicModal] = useState(false);

    const newMsgModalClasses = cn(style.newMsgModal, {
        [style.active]: newMsgModal,
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = event => {
        event.preventDefault();
        const form = event.currentTarget;
        const { topicMsg } = form;
        console.log('Отправили данные формы', topicMsg.value);
        setNewTopicModal(false);
        topicMsg.value = '';
    };

    const handleNewMsg: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setNewTopicModal(true);
    };
    const handleCloseModal: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setNewTopicModal(false);
    };

    const server = new MockServer();
    const topicData = server.getTopic(+topicId!);

    const items = topicData.slice((+page! - 1) * 10, +page! * 10);
    const isShowPrev = page && +page > 1 ? true : undefined;

    const lastPage = Math.ceil(topicData.length / 10);
    const isShowNext = page && +page < lastPage ? true : undefined;

    return (
        <main className={style.main}>
            <div className={style.content}>
                <h1 className={style.h1}>{topicData[0].topic}</h1>
                <div className={style['btn-them-wrap']}>
                    <Button onClick={handleNewMsg} buttonSize="medium">
                        Ответить
                    </Button>
                </div>
                <div className={style['msg-list']}>
                    {items.map(item => (
                        <div key={item.msgId} className={style['topic-row-wrapper']}>
                            <img className={style.sceleton} src={userSceleton} alt="user sceleton" />
                            <div className={style['message-container']}>
                                <span className={style['topic-author']}>{`Автор: ${item.author} -   ${dateFormat(item.createDate, FormatType.DATE_TIME)}`}</span>
                                <span className={style.message}>{item.message}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style['wrapper-links']}>
                    {isShowPrev && (
                        <Link className={style.link} to={`/forum-topic/${topicId}/${Number(page) - 1}`}>
                            Prev
                        </Link>
                    )}
                    <span>{`< ${page} >`}</span>
                    {isShowNext && (
                        <Link className={style.link} to={`/forum-topic/${topicId}/${Number(page) + 1}`}>
                            Next
                        </Link>
                    )}
                </div>
            </div>
            <div className={newMsgModalClasses}>
                <div className={style.modalContent}>
                    <span className={style.modalTitle}>Новое сообщение в обсуждение</span>
                    <form onSubmit={handleSubmit}>
                        <TextArea rows={10} cols={50} label="Вашe сообщение" nameElement="topicMsg" />
                        <div className={style['button-wrap']}>
                            <Button onClick={handleCloseModal} buttonSize="medium">
                                Отмена
                            </Button>
                            <Button type="submit" buttonSize="medium">
                                Отправить
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default ForumTopic;
