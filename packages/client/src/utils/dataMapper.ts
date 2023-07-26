import {
    TCommentServerData,
    TTopicServerData,
    TTopic,
    TTopicComment,
} from '@/types/forumDataTypes';

class DataMapper {
    public mapServerTopicData(data: TTopicServerData): TTopic {
        return {
            id: data.id,
            title: data.topic,
            message: data.message,
            author: data.author,
            commentsCount: data.commentsCount || 0,
            createdDate: data.createdAt,
            lastCommentDate: data.lastMessageDate || data.createdAt,
            authorAvatar: data.authorAvatar,
        };
    }

    public mapServerCommentData(data: TCommentServerData): TTopicComment {
        return {
            id: data.id,
            topicId: data.topicId,
            text: data.message,
            author: data.author,
            createdDate: data.commentCreatedAt,
            authorAvatar: data.authorAvatar,
            replies: data.replies,
        };
    }
}

export default new DataMapper();
