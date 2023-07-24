import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import topicService from '../servises/topic-service';
import { ApiError } from '../exeptions/api-error';

class TopicController {
    async findTopicById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await topicService.findTopicByIdWithCommentsCount(+req.params.id);

            return res.json(data);
        } catch (error) {
            return next(error);
        }
    }

    async getTopicWithLastMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await topicService.getTopicWithLastMessage(
                +req.params.page,
                +req.params.limit
            );
            return res.json(data);
        } catch (error) {
            return next(error);
        }
    }

    async createTopic(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка в данных', errors.array()));
            }

            const { topic, message } = req.body;

            const data = await topicService.createTopic(topic, message, (req as any).UserId);

            return res.json(data);
        } catch (error) {
            return next(error);
        }
    }
}
const topicController = new TopicController();
export default topicController;
