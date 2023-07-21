import { Reaction } from '../db';

class ReactionService {
    async createReaction(message: string, CommentId: number, author: string) {
        return Reaction.create({ message, CommentId, author });
    }

    async findReactionsForComment(commentId: number, isOrderUpdatedASC = false) {
        const UpdatedOrder = isOrderUpdatedASC ? 'ASC' : 'DESC';

        return Reaction.findAndCountAll({
            where: {
                CommentId: commentId,
            },
            order: [['updatedAt', UpdatedOrder]],
        });
    }
}
const commentService = new ReactionService();
export default commentService;
