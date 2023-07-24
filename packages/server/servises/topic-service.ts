import { Topic, sequelize, User } from '../db';
import commentService from './comment-service';

type updateData = {
    topic?: string;
    message?: string;
};

class TopicService {
    createTopic(topic: string, message: string, UserId: number) {
        return Topic.create({ topic, message, UserId });
    }

    findTopicById(id: number) {
        return Topic.findByPk(id);
    }

    async findTopicByIdWithCommentsCount(id: number) {
        const queryResultTopic = await Topic.findByPk(id, {
            include: [{ model: User, attributes: ['login', 'avatar'], required: true }],
        });
        const queryResultConuntComment = await commentService.commentsCountForTopic(id);

        return { topicData: queryResultTopic, сommentsCount: queryResultConuntComment };
    }

    findTopicAll(page: number, limit: number, isOrderUpdatedASC = false) {
        const UpdatedOrder = isOrderUpdatedASC ? 'ASC' : 'DESC';

        return Topic.findAndCountAll({
            offset: limit * page,
            limit,
            order: [['updatedAt', UpdatedOrder]],
        });
    }

    async getTopicWithLastMessage(page: number, limit: number) {
        const offset = limit * (page - 1);

        console.log('page: ', page, ' offset: ', offset);

        const resultQuery = await sequelize.query(
            // eslint-disable-next-line  no-multi-str
            'SELECT t.id, t.topic, t.message, usr.login AS author, t."createdAt", t."updatedAt",COALESCE(c."commentsCount",0) \
            as "commentsCount", \
            CASE WHEN c."topicId" is NULL THEN t."updatedAt" ELSE c."lastMessage" END as "lastMessageDate" \
            FROM public."Topics" t \
            LEFT JOIN public."Users" AS usr ON usr.id = t."UserId" \
            LEFT JOIN (SELECT inc."TopicId" as "topicId", max(inc."updatedAt") as "lastMessage",  count(*) \
            as "commentsCount" \
                           FROM public."Comments" inc  GROUP BY inc."TopicId") AS c ON  c."topicId"=t.id \
            Order BY "lastMessageDate" DESC  \
                OFFSET :offset \
                LIMIT :limit',
            {
                replacements: { offset: `${offset}`, limit: `${limit}` },
                mapToModel: true,
                model: Topic,
            }
        );

        const LastPage = Math.ceil((await Topic.count()) / limit);

        return { topics: [...resultQuery], LastPage };
    }

    async updateTopic(id: number, values: updateData) {
        const updatableTopic = await this.findTopicById(id);

        if (!updatableTopic) return console.log('Topic not found by ID!');

        return updatableTopic.update(values);
    }

    async deleteTopic(id: number) {
        const updatableTopic = await this.findTopicById(id);

        if (!updatableTopic) return console.log('Topic not found by ID!');

        return updatableTopic.destroy();
    }
}
const topicService = new TopicService();
export default topicService;
