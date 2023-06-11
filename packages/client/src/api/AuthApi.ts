import BaseApi from './BaseApi';
import API from '@/api/api';

export interface ISignInData {
    login: string;
    password: string;
}

class AuthApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.AUTH.ENDPOINT);
    }

    public signin(data: ISignInData): Promise<Record<string, string>> {
        return this.http.post(API.ENDPOINTS.AUTH.SIGNIN, data);
    }

    public logout() {
        return this.http.post(API.ENDPOINTS.AUTH.LOGOUT);
    }

    public user() {
        return this.http.get(API.ENDPOINTS.AUTH.USER);
    }
}

export default AuthApi;
