import {
    TCommentListData,
    TCommentListServerData,
    TTopicComment,
    TTopicData,
    TTopicForSave,
    TTopic,
    TTopicListData,
    TTopicListServerData,
    TTopicMessageForSave,
    TTopicReply,
} from '@/types/forumDataTypes';
import BaseApi from './BaseApi';
import API from './api';
import mapper from '@/utils/dataMapper';

class ForumApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.FORUM.ENDPOINT, API.HOST2);
    }

    /* topics */

    public async getTopic(
        topicId: number,
        callback: (data: TTopic) => void,
        errorCallback: (error: string) => void
    ): Promise<void> {
        return this.http
            .get(`${API.ENDPOINTS.FORUM.TOPIC}/${topicId}`)
            .then(response => {
                callback(mapper.mapServerTopicData(response.data as TTopicData));
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
                const data = response.data as TTopicListServerData;
                const topics = data.topics.map(topic => mapper.mapServerTopicData(topic));
                callback({ topics, lastPage: data.lastPage });
            })
            .catch(error => {
                errorCallback(error);
            });
    }

    public async saveTopic(
        data: TTopicForSave,
        callback: (topic: TTopic) => void,
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
                callback(response.data as TTopic);
            })
            .catch(error => {
                errorCallback(error);
            });
    }

    /* comments */

    public async getComments(
        topicId: number,
        page: number,
        elementsPerPage: number,
        callback: (data: TCommentListData) => void
    ): Promise<void> {
        return this.http
            .get(`${API.ENDPOINTS.FORUM.COMMENTS}/${topicId}/${page}/${elementsPerPage}`)
            .then(response => {
                const data = response.data as TCommentListServerData;
                console.log('in get comments');
                console.log(response.data);
                const comments = data.Comments.map(comment => mapper.mapServerCommentData(comment));
                callback({ comments, lastPage: data.LastPage });
            });
    }

    public async saveComment(
        data: TTopicMessageForSave,
        callback: (comment: TTopicComment) => void,
        errorCallback: (error: string) => void
    ): Promise<void> {
        return this.http
            .post(
                API.ENDPOINTS.FORUM.COMMENTS,
                JSON.stringify({ topicId: data.parentId, message: data.text }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(response => {
                callback(response.data as TTopicComment);
            })
            .catch(error => errorCallback(error));
    }

    /* replies */

    public async saveReply(
        data: TTopicMessageForSave,
        callback: (reply: TTopicReply) => void,
        errorCallback: (error: string) => void
    ): Promise<void> {
        return this.http
            .post(
                API.ENDPOINTS.FORUM.REPLIES,
                JSON.stringify({ commentId: data.parentId, message: data.text }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(response => {
                callback(response.data as TTopicReply);
            })
            .catch(error => errorCallback(error));
    }
}

export default new ForumApi();
