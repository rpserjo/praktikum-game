import type { Request, Response } from 'express';
import commentService from '../servises/comment-service';

class CommentController {
    async findCommentsForTopic(req: Request, res: Response) {
        try {
            const { topicId, page, limit } = req.params;
            const data = await commentService.findCommentsForTopic(+topicId, +page, +limit);
            return res.json(data);
        } catch (error) {
            return console.log(error);
        }
    }

    async createComment(req: Request, res: Response) {
        try {
            const { topicId, message } = req.body;

            const data = await commentService.createComment(message, topicId, 'some user');

            return res.json(data);
        } catch (error) {
            return console.log(error);
        }
    }
}
const commentController = new CommentController();
export default commentController;
