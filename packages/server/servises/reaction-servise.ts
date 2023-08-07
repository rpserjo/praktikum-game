import { Reaction, Op } from '../db';
import { Reactions } from '../models/reaction';

class ReactionService {
    async toggleCommentReaction(
        reactionKey: keyof typeof Reactions,
        commentId: number,
        UserId: number
    ) {
        const findResult = (await Reaction.findOne({
            where: {
                [Op.and]: [{ UserId: `${UserId}` }, { CommentId: `${commentId}` }],
            },
        })) as any;

        if (!findResult) {
            await Reaction.create({
                reaction: Reactions[reactionKey],
                CommentId: commentId,
                UserId,
            });
        } else if (findResult.dataValues.reaction === Reactions[reactionKey]) {
            await Reaction.destroy({
                where: {
                    id: `${findResult.dataValues.id}`,
                },
            });
        } else {
            await Reaction.update(
                { reaction: Reactions[reactionKey], CommentId: commentId, UserId },
                {
                    where: {
                        id: `${findResult.dataValues.id}`,
                    },
                }
            );
        }

        return Reaction.findAll({
            where: { CommentId: `${commentId}` },
        });
    }
}
const reactionService = new ReactionService();
export default reactionService;
