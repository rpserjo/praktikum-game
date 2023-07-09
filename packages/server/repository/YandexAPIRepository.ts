import axios from 'axios';

const API_ROOT = 'https://ya-praktikum.tech/api/v2/';

export class YandexAPIRepository {
    // eslint-disable-next-line
    constructor(private cookieHeader: string | undefined) {}

    async getUserData(): Promise<any> {
        const response = await axios.get(`${API_ROOT}/auth/user`, {
            headers: {
                cookie: this.cookieHeader,
            },
        });
        const { data } = response;
        return data;
    }
}
