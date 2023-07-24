import { Comment, sequelize } from '../db';

class CommentService {
    createComment(message: string, TopicId: number, UserId: number) {
        return Comment.create({ message, TopicId, UserId });
    }

    commentsCountForTopic(topicId: number) {
        return Comment.count({ where: { TopicId: `${topicId}` } });
    }

    async findCommentsForTopic(topicId: number, page: number, limit: number) {
        const offset = limit * (page - 1);

        const queryResult = await sequelize.query(
            // eslint-disable-next-line  no-multi-str
            'SELECT c.id, NULL as "replyId", c.message, uc.login AS author \
            , uc.avatar AS "authorAvatar" , c."createdAt" AS "commentCreatedAt", NULL AS "replyCreatedAt" \
            , c."TopicId" AS "topicId"  \
            FROM public."Comments" as c  \
            LEFT JOIN public."Users" AS uc ON c."UserId"=uc.id \
            WHERE c."TopicId" = :topicId \
        UNION ALL \
        SELECT rc.id , r.id as "replyId", r.message, ur.login , ur.avatar AS "authorAvatar", rc."createdAt", \
        r."createdAt", NULL \
            FROM public."Replies" as r \
            JOIN public."Comments" as rc ON rc.id = r."CommentId" AND rc."TopicId" = :topicId \
            LEFT JOIN public."Users" AS ur ON rc."UserId"=ur.id \
            ORDER BY "commentCreatedAt" DESC, "replyCreatedAt" DESC \
            OFFSET :offset \
            LIMIT :limit',
            {
                replacements: { offset: `${offset}`, limit: `${limit}`, topicId: `${topicId}` },
                mapToModel: true,
                model: Comment,
            }
        );

        const commentsArr: Array<any> = [];
        const repliesMap = new Map();

        queryResult.forEach(result => {
            const { dataValues } = result;
            if (dataValues.replyId === null) {
                commentsArr.push(result);
                repliesMap.set(dataValues.commentId, []);

                delete dataValues.replyId;
                delete dataValues.replyCreatedAt;
            } else {
                delete dataValues.topicId;
                repliesMap.get(dataValues.commentId).push(result);
            }
        });

        commentsArr.forEach(e => {
            const { dataValues } = e;
            e.dataValues.replies = repliesMap.get(dataValues.commentId);
        });

        const LastPage = Math.ceil((await Comment.count()) / limit);

        return { Comments: commentsArr, LastPage };
    }
}
const commentService = new CommentService();
export default commentService;
