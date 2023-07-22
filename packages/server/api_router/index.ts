import { Router } from 'express';
import { body, checkExact, param } from 'express-validator';
import { Reactions } from '../models/reaction';

import topicController from '../controllers/topic-controller';
import commentController from '../controllers/comment-controller';
import replyController from '../controllers/reply-controller';
import reactionController from '../controllers/reaction-controller';
import themesController from '../controllers/themes-controller';

const router = Router();

router.post(
    '/topics',
    body('topic').notEmpty().escape(),
    body('message').notEmpty().escape(),
    checkExact([], { message: 'Only topic and message are allowed' }),
    topicController.createTopic
);

router.get(
    '/topic/:id',
    param('id').notEmpty().escape().isInt({ min: 1 }).toInt(),
    topicController.findTopicById
);

router.get(
    '/topics/:page/:limit',
    param(['page', 'limit']).notEmpty().escape().isInt({ min: 1 }).toInt(),
    topicController.getTopicWithLastMessage
);

router.post(
    '/comments',
    body('topicId').isInt().notEmpty().escape(),

    body('message').notEmpty().escape(),
    checkExact([], { message: 'Only topicId and message are allowed' }),
    commentController.createComment
);

router.get(
    '/comments/:topicId/:page/:limit',
    param(['page', 'limit']).notEmpty().escape().isInt({ min: 1 }).toInt(),
    commentController.findCommentsForTopic
);

router.post(
    '/replies',
    body('commentId').isInt().notEmpty().escape(),
    body('message').notEmpty().escape(),
    checkExact([], { message: 'Only commentId and message are allowed' }),
    replyController.createReply
);

router.post(
    '/reactions',
    body('reaction').isIn(Object.keys(Reactions)),
    body('commentId').isInt({ min: 1 }),
    checkExact([], { message: 'Only reaction and commentId are allowed' }),
    reactionController.toggleReaction
);

router.post('/theme', themesController.changeUserTheme);

router.get('/theme', themesController.getCurrentUserTheme);

router.post(
    '/reactions',
    body('reaction').isIn(Object.keys(Reactions)),
    body('commentId').isInt({ min: 1 }),
    checkExact([], { message: 'Only reaction and commentId are allowed' }),
    reactionController.toggleReaction
);

export const apiRouter = router;
