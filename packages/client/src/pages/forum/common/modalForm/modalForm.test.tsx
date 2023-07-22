import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import ModalForm from './modalForm';

describe('Topic form tests', () => {
    const onSubmit = jest.fn(e => e.preventDefault());
    const onClose = jest.fn();

    it('checks that form submits', async () => {
        const themeName = 'New theme';
        render(
            <ModalForm
                handleSubmit={onSubmit}
                handleCloseModal={onClose}
                isTopicForm={true}
                rows={6}
                title="Создание новой темы форума"
            />
        );
        const inputNode = screen.getByLabelText('Название темы');
        await userEvent.type(inputNode, themeName);
        await userEvent.click(screen.getByText('Создать'));
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('checks that form close modal', async () => {
        render(
            <ModalForm
                handleSubmit={onSubmit}
                handleCloseModal={onClose}
                isTopicForm={true}
                rows={6}
                title="Создание новой темы форума"
            />
        );
        await userEvent.click(screen.getByText('Отмена'));
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
