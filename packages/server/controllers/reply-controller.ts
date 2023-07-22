import type { Request, Response } from 'express';
import replyService from '../servises/reply-service';

class ReplyController {
    async createReply(req: Request, res: Response) {
        try {
            const { commentId, message } = req.body;

            const data = await replyService.createReply(message, commentId, 'some user');

            return res.json(data);
        } catch (error) {
            return console.log(error);
        }
    }
}
const replyController = new ReplyController();
export default replyController;
