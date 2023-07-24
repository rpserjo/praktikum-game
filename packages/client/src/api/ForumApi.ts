import {
    TCommentData,
    TCommentListData,
    TTopicData,
    TTopicForSave,
    TTopicInfo,
    TTopicListData,
    TTopicMessage,
    TTopicMessageForSave,
} from '@/types/forumDataTypes';
import BaseApi from './BaseApi';
import API from './api';
import mapper from '@/utils/dataMapper';

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
        callback: (topic: TTopicInfo) => void,
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
                callback(response.data as TTopicInfo);
            })
            .catch(error => {
                errorCallback(error);
            });
    }

    public async getTopic(
        topicId: number,
        callback: (data: TTopicInfo) => void,
        errorCallback: (error: string) => void
    ): Promise<void> {
        return this.http
            .get(`${API.ENDPOINTS.FORUM.TOPIC}/${topicId}`)
            .then(response => {
                console.log(response.data);
                const { data } = response; // as TTopicData;
                callback(mapper.mapServerTopicData(data));
            })
            .catch(error => {
                errorCallback(error);
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
                const data = response.data.topics as TTopicData[];
                const topics: TTopicInfo[] = data.map(topic => mapper.mapServerTopicData(topic));
                callback({ topics, lastPage: response.data.lastPage }); // how to get last page?
            })
            .catch(error => {
                errorCallback(error);
            });
    }

    public async getComments(
        topicId: number,
        page: number,
        elementsPerPage: number,
        callback: (data: TCommentListData) => void
    ): Promise<void> {
        return this.http
            .get(`${API.ENDPOINTS.FORUM.COMMENTS}/${topicId}/${page}/${elementsPerPage}`)
            .then(response => {
                console.log('comments');
                console.log(response.data);
                const data = response.data.comments as TCommentData[];
                const comments = data.map(comment => mapper.mapServerCommentData(comment));
                callback({ comments, lastPage: response.data.lastPage });
            });
    }
}

export default new ForumApi();
