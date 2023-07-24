import { TCommentData, TTopicData, TTopic, TTopicComment } from '@/types/forumDataTypes';

class DataMapper {
    public mapServerTopicData(data: TTopicData): TTopic {
        return {
            id: data.id,
            title: data.topic,
            message: data.message,
            author: data.author,
            commentsCount: data.commentsCount || 0, // test!!!
            createdDate: data.createdAt,
            lastCommentDate: data.lastMessageDate || data.createdAt, // test!!!
            authorAvatar: data.authorAvatar,
        };
    }

    public mapServerCommentData(data: TCommentData): TTopicComment {
        return {
            id: data.id,
            topicId: data.topicId,
            text: data.message,
            author: data.author,
            createdDate: data.createdAt,
            authorAvatar: data.authorAvatar,
            replies: data.replies,
        };
    }
}

export default new DataMapper();
