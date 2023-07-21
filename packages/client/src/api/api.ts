const HOST = 'http://localhost:3001/api/v2';
export const oauthProviderUri = 'https://oauth.yandex.ru/authorize?response_type=code';

const API = {
    HOST,
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
    },
};

export default API;
