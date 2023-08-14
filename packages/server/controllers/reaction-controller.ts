import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import reactionService from '../services/reaction-servise';
import { Reactions } from '../models/reaction';
import { ApiError } from '../exeptions/api-error';

class ReactionController {
    async toggleReaction(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest(
                        `Ошибка, возможные значения поля reaction: ${Object.keys(
                            Reactions
                        )}, commentId : number`,
                        errors.array()
                    )
                );
            }

            const { reaction, commentId } = req.body;

            const data = await reactionService.toggleCommentReaction(
                reaction,
                commentId,
                (req as any).UserId as number
            );

            return res.json(data);
        } catch (error) {
            return next(error);
        }
    }
}
const reactionController = new ReactionController();
export default reactionController;
