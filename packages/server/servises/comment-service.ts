import { Comment, sequelize } from '../db';

class CommentService {
    async createComment(message: string, TopicId: number, author: string) {
        return Comment.create({ message, TopicId, author });
    }

    async findCommentsForTopic(topicId: number, page: number, limit: number) {
        const offset = limit * (page - 1);
        return sequelize.query(
            // eslint-disable-next-line  no-multi-str
            'SELECT c.id as "commentId", NULL as "replyId", c.message, c.author \
            , c."createdAt" AS "commentCreatedAt", NULL AS "replyCreatedAt"  \
            FROM public."Comments" as c  \
            WHERE c."TopicId" = :topicId \
        UNION ALL \
        SELECT rc.id , r.id as "replyId", r.message, r.author, rc."createdAt", r."createdAt" \
            FROM public."Replies" as r \
            JOIN public."Comments" as rc ON rc.id = r."CommentId" AND rc."TopicId" = :topicId \
            ORDER BY "commentCreatedAt" DESC, "replyCreatedAt" DESC \
            OFFSET :offset \
            LIMIT :limit',
            {
                replacements: { offset: `${offset}`, limit: `${limit}`, topicId: `${topicId}` },
                mapToModel: true,
                model: Comment,
            }
        );
    }
}
const commentService = new CommentService();
export default commentService;
