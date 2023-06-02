import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryInterface {
    reserveUI?: string | ReactNode;
    children?: string | ReactNode;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryInterface> {
    constructor(props: ErrorBoundaryInterface) {
        super(props);

        this.state = {
            hasError: false,
            errors: [],
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        const { errors } = this.state;
        this.setState({ errors: [...errors, { error, errorInfo }] });
    }

    render() {
        const { state, props } = this;
        const { reserveUI = 'Что-то пошло не так', children } = props;
        const { hasError } = state;
        return hasError ? <div>{reserveUI}</div> : children;
    }
}
