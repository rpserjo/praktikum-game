import type { Request, Response } from 'express';
import topicService from '../servises/topic-service';

class TopicController {
    async findTopicById(req: Request, res: Response) {
        try {
            const data = await topicService.findTopicById(+req.params.id);
            console.log(req.headers);
            return res.json(data);
        } catch (error) {
            return console.log(error);
        }
    }

    async getTopicWithLastMessage(req: Request, res: Response) {
        try {
            const data = await topicService.getTopicWithLastMessage(
                +req.params.page,
                +req.params.limit
            );
            return res.json(data);
        } catch (error) {
            return console.log(error);
        }
    }

    async createTopic(req: Request, res: Response) {
        try {
            console.log(req.body);

            const { topic, message } = req.body;

            const data = await topicService.createTopic(topic, message);

            return res.json(data);
        } catch (error) {
            return console.log(error);
        }
    }
}

export const topicController = new TopicController();
