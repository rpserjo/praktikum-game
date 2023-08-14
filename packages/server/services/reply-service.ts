import { Reply } from '../db';

class ReplyService {
    async createReply(message: string, CommentId: number, UserId: number) {
        return Reply.create({ message, CommentId, UserId });
    }
}
const replyService = new ReplyService();
export default replyService;
