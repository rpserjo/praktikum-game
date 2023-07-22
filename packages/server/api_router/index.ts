import { Router } from 'express';
import { body, checkExact } from 'express-validator';
import { Reactions } from '../models/reaction';

import topicController from '../controllers/topic-controller';
import commentController from '../controllers/comment-controller';
import replyController from '../controllers/reply-controller';
import reactionController from '../controllers/reaction-controller';

const router = Router();

router.get('/topic/:id', topicController.findTopicById);

router.post('/topics', topicController.createTopic);

router.get('/topics/:page/:limit', topicController.getTopicWithLastMessage);

router.post('/comments', commentController.createComment);

router.get('/comments/:topicId/:page/:limit', commentController.findCommentsForTopic);

router.post('/replies', replyController.createReply);

router.post(
    '/reactions',
    body('reaction').isIn(Object.keys(Reactions)),
    body('commentId').isInt({ min: 1 }),
    checkExact([], { message: 'Only reaction and commentId are allowed' }),
    reactionController.toggleReaction
);

export const apiRouter = router;
