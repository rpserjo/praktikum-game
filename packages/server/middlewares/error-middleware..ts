import type { response, request } from 'express';
import { ApiError } from '../exeptions/api-error';

export default function errorMiddleware(
    err: Error,
    // @ts-ignore
    req: typeof request,
    res: typeof response
) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
}
