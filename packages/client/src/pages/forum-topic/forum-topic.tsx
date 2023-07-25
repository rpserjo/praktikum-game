import React, { FC, MouseEventHandler, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@components/ui/button/button';
import Emojis from '@components/ui/emojis/emojis';
import style from './forum-topic.module.scss';
import MockServer from '@/mocks/mock-server';
import { dateFormat, FormatType } from '@/helpers/dateformat';
import TextArea from '@/components/ui/textarea/textarea';
import userSceleton from '@/assets/images/user-sceleton.png';
import Pagination from '@/components/ui/pagination/pagination';
import Modal from '@/components/ui/modal/modal';

type FormFields = {
    topicMessage: HTMLInputElement;
};

const ForumTopic: FC = () => {
    const { page = 1, topicId } = useParams();
    const [newMessageModal, setNewTopicModal] = useState(false);

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

    const MAX_ELEMENTS_PER_PAGE = 10;

    const server = new MockServer();
    const serverData = server.getTopic(+topicId!, +page, MAX_ELEMENTS_PER_PAGE);

    return (
        <main className={style.main}>
            <div className={style.content}>
                <h1 className={style.h1}>{serverData.items[0].topic}</h1>
                <div className={style['btn-them-wrap']}>
                    <Button onClick={handleNewMessage} buttonSize="medium">
                        Ответить
                    </Button>
                </div>
                <div className={style['message-list']}>
                    {serverData.items.map(item => (
                        <div key={item.msgId}>
                            <div className={style['topic-row-wrapper']}>
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
                            <Emojis messageId={item.msgId} />
                        </div>
                    ))}
                </div>
                <Pagination
                    currentPage={+page}
                    lastPage={serverData.lastPage}
                    linkPath={`/forum-topic/${topicId}/`}
                />
            </div>
            <Modal isActive={newMessageModal}>
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
            </Modal>
        </main>
    );
};

export default ForumTopic;
