import { StoreState } from './store';

// eslint-disable-next-line
declare const __SERVER_PORT__: number;

declare global {
    interface Window {
        initialState?: StoreState;
    }
}
