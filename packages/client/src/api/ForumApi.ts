import {
    TCommentData,
    TTopicData,
    TTopicForSave,
    TTopicInfo,
    TTopicListData,
    TTopicMessage,
    TTopicMessageForSave,
} from '@/types/data-types';
import BaseApi from './BaseApi';
import API from './api';

// todo right path without v2
class ForumApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.FORUM.ENDPOINT, API.HOST2);
    }

    public async saveComment(data: TTopicMessageForSave): Promise<void> {
        return this.http
            .post(
                API.ENDPOINTS.FORUM.COMMENTS,
                JSON.stringify({ topicId: data.id, message: data.text }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(response => {
                const comment = response.data as TTopicMessage;
                console.log('success save mes');
                console.log(comment);
                // todo refresh list + message comment saved
            })
            .catch(error => {
                console.log(error);
                // show error
            });
    }

    public async saveReply(data: TTopicMessageForSave): Promise<void> {
        return this.http.post(
            API.ENDPOINTS.FORUM.REPLIES,
            JSON.stringify({ topicId: data.id, message: data.text })
        );
    }

    public async saveTopic(
        data: TTopicForSave,
        // callback: (topic: TTopicInfo) => void,
        errorCallback: (error: string) => void
    ): Promise<void> {
        return this.http
            .post(
                API.ENDPOINTS.FORUM.TOPICS,
                JSON.stringify({ topic: data.title, message: data.text }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(response => {
                console.log('topic saved');
                console.log(response.data);
                // callback(topicInfo as TTopicInfo)
            })
            .catch(error => {
                errorCallback(error);
            });
    }

    public async getTopic(topicId: number, callback: (data: TTopicInfo) => void): Promise<void> {
        // todo TTopicInfo??
        console.log(`${API.HOST2}${API.ENDPOINTS.FORUM.TOPICS}/${topicId}`);
        return this.http.get(`${API.ENDPOINTS.FORUM.TOPICS}/${topicId}`).then(response => {
            console.log(response.data);
            const { data } = response; // as TTopicData;
            callback({
                id: data.id,
                title: data.topic,
                message: data.message,
                author: data.author,
                commentsCount: 0, // data.commentsCount,
                createdDate: data.createdAt,
                lastCommentDate: data.createdAt, // data.lastMessageDate,
            });
        });
    }

    public async getTopics(
        page: number,
        elementsPerPage: number,
        callback: (data: TTopicListData) => void,
        errorCallback: (error: string) => void
    ): Promise<void> {
        return this.http
            .get(`${API.ENDPOINTS.FORUM.TOPICS}/${page}/${elementsPerPage}`)
            .then(response => {
                const data = response.data as TTopicData[];
                const topics: TTopicInfo[] = data.map(topic => ({
                    id: topic.id,
                    title: topic.topic,
                    message: topic.message,
                    author: topic.author,
                    commentsCount: topic.commentsCount,
                    createdDate: topic.createdAt,
                    lastCommentDate: topic.lastMessageDate,
                }));
                // console.log(response.data);
                callback({ topics, lastPage: 3 }); // how to get last page?
            })
            .catch(error => {
                errorCallback(error);
            });
    }

    public async getComments(
        topicId: number,
        page: number,
        elementsPerPage: number,
        callback: (data: TTopicMessage[]) => void
    ): Promise<void> {
        return this.http
            .get(`${API.ENDPOINTS.FORUM.TOPICS}/${topicId}/${page}/${elementsPerPage}`)
            .then(response => {
                console.log('comments');
                console.log(response.data);
                const data = response.data as TCommentData[];
                const comments: TTopicMessage[] = data.map((comment: TCommentData) => ({
                    id: comment.id,
                    text: comment.message,
                    author: comment.author,
                    createdDate: comment.createdAt,
                }));
                callback(comments);
            });
    }
}

export default new ForumApi();
