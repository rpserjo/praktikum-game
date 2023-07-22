import type { Request, Response } from 'express';
import reactionService from '../servises/reaction-servise';
import authService from '../servises/proxy-auth-service';

class ReactionController {
    async toggleReaction(req: Request, res: Response) {
        const { uuid, authCookie } = req.cookies;

        // @ts-ignore
        const { UserId } = await authService.findUserByCookies(uuid, authCookie);

        try {
            const { reaction, commentId } = req.body;

            const data = await reactionService.toggleCommentReaction(
                reaction,
                commentId,
                UserId as number
            );

            return res.json(data);
        } catch (error) {
            return console.log(error);
        }
    }
}
const reactionController = new ReactionController();
export default reactionController;
