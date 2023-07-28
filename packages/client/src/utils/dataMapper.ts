import {
    TCommentServerData,
    TTopicServerData,
    TTopic,
    TTopicComment,
    TTopicListServerData,
    TTopicListData,
    TCommentListData,
    TCommentListServerData,
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

    public mapServerTopicListData(data: TTopicListServerData): TTopicListData {
        const topics = data.topics.map(topic => this.mapServerTopicData(topic));
        return {
            topics,
            lastPage: data.LastPage,
        };
    }

    public mapServerComentListData(data: TCommentListServerData): TCommentListData {
        const comments = data.Comments.map(comment => this.mapServerCommentData(comment));
        return { comments, lastPage: data.LastPage };
    }
}

export default new DataMapper();
