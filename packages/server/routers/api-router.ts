import { Router } from 'express';

import topicController from '../controllers/topic-controller';
import commentController from '../controllers/comment-controller';
import replyController from '../controllers/reply-controller';

const router = Router();

router.get('/topic/:id', topicController.findTopicById);

router.post('/topics', topicController.createTopic);

router.get('/topics/:page/:limit', topicController.getTopicWithLastMessage);

router.post('/comments', commentController.createComment);

router.get('/comments/:topicId/:page/:limit', commentController.findCommentsForTopic);

router.post('/replies', replyController.createReply);

const apiRouter = router;
export default apiRouter;
