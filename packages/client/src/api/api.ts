const HOST = 'https://ya-praktikum.tech/api/v2';
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
