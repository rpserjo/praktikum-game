import type { response, request, NextFunction } from 'express';
import { ApiError } from '../exeptions/api-error';

export default function errorMiddleware(
    err: Error,
    // @ts-ignore
    req: typeof request,
    res: typeof response,
    // @ts-ignore
    next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
}
