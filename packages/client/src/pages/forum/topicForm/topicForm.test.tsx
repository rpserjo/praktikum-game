import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import TopicForm from './topicForm';

describe('Topic form tests', () => {
    const onSubmit = jest.fn(e => e.preventDefault());
    const onClose = jest.fn();

    it('checks that form renders', async () => {
        const themeName = 'New theme';
        render(<TopicForm handleSubmit={onSubmit} handleCloseModal={onClose} />);
        const inputNode = screen.getByLabelText('Название темы');
        await userEvent.type(inputNode, themeName);
        await userEvent.click(screen.getByText('Создать'));
        expect(onSubmit).toHaveBeenCalled();
    });
});
