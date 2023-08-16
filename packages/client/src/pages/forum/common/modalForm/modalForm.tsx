import React, { FC, FormEventHandler, MouseEventHandler } from 'react';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/input/input';
import TextArea from '@/components/ui/textarea/textarea';
import style from './modalForm.module.scss';

export type TModalFormProps = {
    handleSubmit: FormEventHandler;
    handleCloseModal: MouseEventHandler;
    title: string;
    rows: number;
    isTopicForm: boolean;
};

const ModalForm: FC<TModalFormProps> = ({
    handleSubmit,
    handleCloseModal,
    title,
    rows,
    isTopicForm,
}) => (
    <>
        <p className={style.title}>{title}</p>
        <form onSubmit={handleSubmit}>
            {isTopicForm && (
                <div className={style.topicTitle}>
                    <Input label="Название темы" name="title" />
                </div>
            )}
            <TextArea rows={rows} cols={50} label="Вашe сообщение" name="text" />
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

export default ModalForm;
