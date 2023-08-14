import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exeptions/api-error';
import authService from '../servises/proxy-auth-service';

// @ts-ignore
export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { uuid, authCookie } = req.cookies;

    try {
        const { UserId } = (await authService.checkUserAuth(uuid, authCookie)) as any;

        if (!UserId) {
            return next(ApiError.UnauthorizedError());
        }

        (req as any).UserId = UserId;

        return next();
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
}
