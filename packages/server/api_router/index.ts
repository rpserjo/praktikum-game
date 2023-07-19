import { Router } from 'express';

import { topicController } from '../controllers/topic-controller';

const router = Router();

router.get('/topic/:id', topicController.findTopicById);

router.post('/topics', topicController.createTopic);

router.get('/topics/:page/:limit', topicController.getTopicWithLastMessage);

export const apiRouter = router;
