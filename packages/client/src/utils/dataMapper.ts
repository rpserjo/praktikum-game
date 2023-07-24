import { TCommentData, TTopicData, TTopicInfo, TTopicMessage } from '@/types/forumDataTypes';

class DataMapper {
    public mapServerTopicData(data: TTopicData): TTopicInfo {
        return {
            id: data.id,
            title: data.topic,
            message: data.message,
            author: data.author,
            commentsCount: data.commentsCount || 0, // test!!!
            createdDate: data.createdAt,
            lastCommentDate: data.lastMessageDate || data.createdAt, // test!!!
        };
    }

    public mapServerCommentData(data: TCommentData): TTopicMessage {
        return {
            id: data.id,
            topicId: data.topicId,
            text: data.message,
            author: data.author,
            createdDate: data.createdAt,
        };
    }
}

export default new DataMapper();
