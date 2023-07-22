import { Reply } from '../db';

class ReplyService {
    async createReply(message: string, CommentId: number, author: string) {
        return Reply.create({ message, CommentId, author });
    }
}
const replyService = new ReplyService();
export default replyService;
