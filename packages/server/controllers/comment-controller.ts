import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import commentService from '../services/comment-service';
import { ApiError } from '../exeptions/api-error';

class CommentController {
    async findCommentsForTopic(req: Request, res: Response, next: NextFunction) {
        try {
            const { topicId, page, limit } = req.params;
            const data = await commentService.findCommentsForTopic(+topicId, +page, +limit);
            return res.json(data);
        } catch (error) {
            return next(error);
        }
    }

    async createComment(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка переданных данных', errors.array()));
            }

            const { topicId, message } = req.body;

            const data = await commentService.createComment(message, topicId, (req as any).UserId);

            return res.json(data);
        } catch (error) {
            return next(error);
        }
    }
}
const commentController = new CommentController();
export default commentController;
