import { render, screen } from '@testing-library/react';
import App from './App';

const appContent = 'Вот тут будет жить ваше приложение :)';

// @ts-ignore
global.fetch = jest.fn(() => {
    Promise.resolve({ json: () => Promise.resolve('hey') });
});

test('Example test', async () => {
    render(<>Вот тут будет жить ваше приложение :)</>);
    expect(screen.getByText(appContent)).toBeDefined();
});
