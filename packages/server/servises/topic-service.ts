import { Topic, sequelize } from '../db';

type updateData = {
    topic?: string;
    message?: string;
};

class TopicService {
    async createTopic(topic: string, message: string) {
        return Topic.create({ topic, message, author: 'Some user' });
    }

    async findTopicById(id: number) {
        return Topic.findByPk(id);
    }

    async findTopicAll(page: number, limit: number, isOrderUpdatedASC = false) {
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

        return sequelize.query(
            // eslint-disable-next-line  no-multi-str
            'SELECT t.id, topic, t.message, author, t."createdAt", t."updatedAt", \
            CASE WHEN (SELECT "updatedAt" FROM public."Comments" WHERE "TopicId" = t.id ORDER BY "updatedAt" DESC LIMIT 1) is NULL THEN t."updatedAt" END LastMessage \
                FROM public."Topics" as t \
                Order BY LastMessage DESC \
                OFFSET :offset \
                LIMIT :limit',
            {
                replacements: { offset: `${offset}`, limit: `${limit}` },
                mapToModel: true,
                model: Topic,
            }
        );
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
