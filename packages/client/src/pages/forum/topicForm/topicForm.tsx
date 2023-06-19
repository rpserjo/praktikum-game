import React, { FC, FormEventHandler, MouseEventHandler } from 'react';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/input/input';
import TextArea from '@/components/ui/textarea/textarea';
import style from '../forum.module.scss';

type TTopicFormProps = {
    handleSubmit: FormEventHandler;
    handleCloseModal: MouseEventHandler;
};

const TopicForm: FC<TTopicFormProps> = ({ handleSubmit, handleCloseModal }) => (
    <>
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
    </>
);

export default TopicForm;
