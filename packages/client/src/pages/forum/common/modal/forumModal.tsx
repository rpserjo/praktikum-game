import React, { FC, MouseEventHandler, useState } from 'react';
import Modal from '@/components/ui/modal/modal';
import ModalForm from '../modalForm/modalForm';
import { TTopicForSave, TTopicMessageForSave } from '@/types/data-types';
import { Loader } from '@/components/ui';

type TForumModalProps = {
    id?: number; // topic id for comment or comment id for reply
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    isTopicForm: boolean;
    rows: number;
    modalTitle: string;
    submit: (data: TTopicMessageForSave | TTopicForSave) => void;
};
type FormFields = {
    title?: HTMLInputElement;
    text: HTMLTextAreaElement;
};

export const ForumModal: FC<TForumModalProps> = props => {
    const { id = -1, isActive, setIsActive, isTopicForm, submit, rows, modalTitle } = props;
    const [isLoaderActive, setIsLoaderActive] = useState(false);

    const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = event => {
        event.preventDefault();
        const form = event.currentTarget;
        const { text } = form;
        // todo draw loader
        setIsLoaderActive(true);
        // todo escape chars?
        if (isTopicForm) {
            const { title } = form;
            submit({
                title: title.value,
                text: text.value,
            });
            title.value = '';
            setIsLoaderActive(false); // todo link to result
        } else {
            submit({
                id,
                text: text.value,
            });
            setIsLoaderActive(false); // todo link to result
        }

        setIsActive(false); // todo should be in the same place with success and error callback,
        // depends on them
        text.value = '';
    };
    const closeModal: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setIsActive(false);
    };

    if (isLoaderActive) {
        return <Loader />;
    }
    return (
        <Modal isActive={isActive}>
            <ModalForm
                handleSubmit={handleSubmit}
                handleCloseModal={closeModal}
                isTopicForm={isTopicForm}
                rows={rows}
                title={modalTitle}
            />
        </Modal>
    );
};
