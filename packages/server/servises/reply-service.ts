import { Reply } from '../db';

class ReplyService {
    async createReply(message: string, CommentId: number, author: string) {
        return Reply.create({ message, CommentId, author });
    }

    async findReplysForComment(commentId: number, isOrderUpdatedASC = false) {
        const UpdatedOrder = isOrderUpdatedASC ? 'ASC' : 'DESC';

        return Reply.findAndCountAll({
            where: {
                CommentId: commentId,
            },
            order: [['updatedAt', UpdatedOrder]],
        });
    }
}
const commentService = new ReplyService();
export default commentService;
