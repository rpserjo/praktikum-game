import { TTopicForSave, TTopicInfo, TTopicMessageForSave } from '@/types/data-types';
import BaseApi from './BaseApi';
import API from './api';

// todo right path without v2
class ForumApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.FORUM.ENDPOINT);
    }

    public async saveComment(data: TTopicMessageForSave): Promise<void> {
        return this.http.post(
            API.ENDPOINTS.FORUM.COMMENTS,
            JSON.stringify({ topicId: data.id, message: data.text })
        );
    }

    public async saveReply(data: TTopicMessageForSave): Promise<void> {
        return this.http.post(
            API.ENDPOINTS.FORUM.REPLIES,
            JSON.stringify({ topicId: data.id, message: data.text })
        );
    }

    public async saveTopic(
        data: TTopicForSave,
        callback: (topic: TTopicInfo) => void,
        errorCallback: (error: string) => void
    ): Promise<void> {
        /* return this.http.post(
            API.ENDPOINTS.FORUM.TOPICS,
            JSON.stringify({ topic: data.title, message: data.text })
        ); */
        const topic: TTopicInfo = {
            id: 1,
            title: 'Тест название топика 1',
            message: 'Тест сообщение топика 1',
            author: 'Some user',
            createdDate: '2023-07-19T18:06:53.412Z',
            commentsCount: 0, // todo for new topic
            lastCommentDate: '2023-07-19T18:06:53.412Z', // todo do we need to update model?
        };
        const result = new Promise(resolve => {
            setTimeout(() => resolve(topic), 2000);
        });
        result
            .then(topicInfo => callback(topicInfo as TTopicInfo))
            .catch(error => {
                errorCallback(error);
            });
    }

    public async getTopic(topicId: number): Promise<TTopicInfo> {
        // todo TTopicInfo??
        return this.http.get(`${API.ENDPOINTS.FORUM.TOPICS}/${topicId}`);
    }

    public async getTopics(page: number, elementsPerPage: number): Promise<TTopicInfo[]> {
        // todo TTopicInfo??
        return this.http.get(`${API.ENDPOINTS.FORUM.TOPICS}/${page}/${elementsPerPage}`);
    }
}

export default ForumApi;
