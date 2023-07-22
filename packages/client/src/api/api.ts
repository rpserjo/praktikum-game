const HOST = 'http://localhost:3000/api/v2'; // TODO: SET PORT FROM .env
const HOST2 = 'http://localhost:3000/api/';
export const oauthProviderUri = 'https://oauth.yandex.ru/authorize?response_type=code';

const API = {
    HOST,
    HOST2,
    RESOURCES: `${HOST}/resources`,
    RESOURCES_UPLOAD: '/resources',
    ENDPOINTS: {
        AUTH: {
            ENDPOINT: '/auth',
            SIGNUP: '/signup',
            SIGNIN: '/signin',
            USER: '/user',
            LOGOUT: '/logout',
        },
        OAUTH: {
            ENDPOINT: '/oauth/yandex',
            SERVICEID: '/service-id',
        },
        USER: {
            ENDPOINT: '/user',
            PROFILE: '/profile',
            AVATAR: '/profile/avatar',
            PASSWORD: '/password',
            SEARCH: '/search',
        },
        LEADERBOARD: {
            ENDPOINT: '/leaderboard',
            ALL: '/all',
            POSTUSER: '',
        },
        FORUM: {
            ENDPOINT: '',
            COMMENTS: '/comments',
            REPLIES: '/replies',
            TOPICS: '/topics',
        },
    },
};

export default API;
