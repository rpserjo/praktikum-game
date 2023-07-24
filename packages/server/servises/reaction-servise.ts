import { Reaction, Op } from '../db';
import { Reactions } from '../models/reaction';

class ReactionService {
    async toggleCommentReaction(
        reactionKey: keyof typeof Reactions,
        commentId: number,
        UserId: number
    ) {
        await Reaction.destroy({
            where: {
                [Op.and]: [{ UserId: `${UserId}` }, { CommentId: `${commentId}` }],
            },
        });
        await Reaction.create({ reaction: Reactions[reactionKey], CommentId: commentId, UserId });

        return Reaction.findAll({
            where: { CommentId: `${commentId}` },
        });
    }
}
const reactionService = new ReactionService();
export default reactionService;
