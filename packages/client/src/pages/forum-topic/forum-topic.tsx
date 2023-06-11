import React, { FC, MouseEventHandler, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import Button from '@components/ui/button/button';
import style from './forum-topic.module.scss';
import MockServer from '@/mocks/mock-server';
import { dateFormat, FormatType } from '@/helpers/dateformat';
import TextArea from '@/components/ui/textarea/textarea';
import userSceleton from '@/assets/images/user-sceleton.png';

type FormFields = {
    topicMessage: HTMLInputElement;
};

const ForumTopic: FC = () => {
    const { page = 1, topicId } = useParams();
    const [newMessageModal, setNewTopicModal] = useState(false);

    const newMessageModalClasses = cn(style.newMessageModal, {
        [style.active]: newMessageModal,
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = event => {
        event.preventDefault();
        const form = event.currentTarget;
        const { topicMessage } = form;
        console.log('Отправили данные формы', topicMessage.value);
        setNewTopicModal(false);
        topicMessage.value = '';
    };

    const handleNewMessage: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setNewTopicModal(true);
    };
    const handleCloseModal: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setNewTopicModal(false);
    };

    const server = new MockServer();
    const topicData = server.getTopic(+topicId!);

    // todo: техдолг - вынести пагинацию в отдельный компонент
    const MAX_ELEMENTS_PER_PAGE = 10;
    const items = topicData.slice(
        (+page! - 1) * MAX_ELEMENTS_PER_PAGE,
        +page! * MAX_ELEMENTS_PER_PAGE
    );
    const isShowPrev = page && +page > 1;

    const lastPage = Math.ceil(topicData.length / MAX_ELEMENTS_PER_PAGE);
    const isShowNext = page && +page < lastPage;

    return (
        <main className={style.main}>
            <div className={style.content}>
                <h1 className={style.h1}>{topicData[0].topic}</h1>
                <div className={style['btn-them-wrap']}>
                    <Button onClick={handleNewMessage} buttonSize="medium">
                        Ответить
                    </Button>
                </div>
                <div className={style['message-list']}>
                    {items.map(item => (
                        <div key={item.msgId} className={style['topic-row-wrapper']}>
                            <img
                                className={style.sceleton}
                                src={userSceleton}
                                alt="user sceleton"
                            />
                            <div className={style['message-container']}>
                                <span className={style['topic-author']}>
                                    {`Автор: ${item.author} -   ${dateFormat(
                                        item.createDate,
                                        FormatType.DATE_TIME
                                    )}`}
                                </span>
                                <span className={style.message}>{item.message}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style['wrapper-links']}>
                    {isShowPrev && (
                        <Link
                            className={style.link}
                            to={`/forum-topic/${topicId}/${Number(page) - 1}`}
                        >
                            Prev
                        </Link>
                    )}
                    <span>{`< ${page} >`}</span>
                    {isShowNext && (
                        <Link
                            className={style.link}
                            to={`/forum-topic/${topicId}/${Number(page) + 1}`}
                        >
                            Next
                        </Link>
                    )}
                </div>
            </div>
            <div className={newMessageModalClasses}>
                <div className={style.modalContent}>
                    <span className={style.modalTitle}>Новое сообщение в обсуждение</span>
                    <form onSubmit={handleSubmit}>
                        <TextArea rows={10} cols={50} label="Вашe сообщение" name="topicMessage" />
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
