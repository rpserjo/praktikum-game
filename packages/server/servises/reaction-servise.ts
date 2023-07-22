import { Reaction } from '../db';
import { Reactions } from '../models/reaction';

class ReactionService {
    async toggleCommentReaction(
        reactionKey: keyof typeof Reactions,
        commentId: number,
        UserId: number
    ) {
        return Reaction.create({ reactions: Reactions[reactionKey], CommentId: commentId, UserId });
    }
}
const reactionService = new ReactionService();
export default reactionService;
