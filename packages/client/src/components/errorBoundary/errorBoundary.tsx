import React, { ErrorInfo, ReactNode } from 'react';
import style from './errorBoundary.module.scss';

type TErrorBoundaryProps = {
    reserveUI?: string | ReactNode;
    children?: string | ReactNode;
};

type TErrorBoundaryState = {
    hasError: boolean;
};

export default class ErrorBoundary extends React.Component<
    TErrorBoundaryProps,
    TErrorBoundaryState
> {
    constructor(props: TErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // todo: заменить это временное решение на использование глобального состояния
        const errors = JSON.parse(window.localStorage.getItem('errors') || '[]');
        const { message, stack } = error;
        const newErrors = JSON.stringify([...errors, { error: { message, stack }, errorInfo }]);
        window.localStorage.setItem('errors', newErrors);
    }

    render() {
        const reserve = (
            <div className={style.errorBoundaryReserveContentPlug}>Что-то пошло не так</div>
        );
        const { state, props } = this;
        const { reserveUI = reserve, children } = props;
        const { hasError } = state;

        return hasError ? (
            <div className={style.errorBoundaryReserveContent}>{reserveUI}</div>
        ) : (
            children
        );
    }
}
