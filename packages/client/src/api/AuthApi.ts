import { AxiosError } from 'axios';
import BaseApi from './BaseApi';
import API from '@/api/api';
import { SignInData, SignUpData, TProfileProps } from '@/models/models';

type ErrorResponse = {
    reason: string;
};
class AuthApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.AUTH.ENDPOINT);
    }

    public async signin(
        data: SignInData,
        proceedCallback: () => void,
        errorCallback: (error: string) => void
    ): Promise<void> {
        const result = this.http.post(API.ENDPOINTS.AUTH.SIGNIN, data);
        result
            .then(() => {
                proceedCallback();
            })
            .catch((response: AxiosError) => {
                const responseData = response.response?.data;
                const { reason } = responseData as ErrorResponse;

                if (reason === 'User already in system') {
                    proceedCallback();
                } else {
                    errorCallback(reason);
                }
            });
    }

    public async signup(
        data: SignUpData,
        proceedCallback: () => void,
        errorCallback: (error: string) => void
    ): Promise<void> {
        const result = this.http.post(API.ENDPOINTS.AUTH.SIGNUP, data);
        result
            .then(() => {
                proceedCallback();
            })
            .catch((response: AxiosError) => {
                const responseData = response.response?.data;
                const { reason } = responseData as ErrorResponse;

                if (reason === 'User already in system') {
                    proceedCallback();
                } else {
                    errorCallback(reason);
                }
            });
    }

    public logout() {
        return this.http.post(API.ENDPOINTS.AUTH.LOGOUT);
    }

    public getUserData() {
        return this.http.get(API.ENDPOINTS.AUTH.USER);
    }

    // todo how can we refactor this when redux will store user data?
    public async getUser(
        setUserDataCallback: (userData: TProfileProps) => void,
        setUserFetchedCallback: ((userFetched: boolean) => void) | undefined = undefined
    ): Promise<void> {
        const result = this.http.get(API.ENDPOINTS.AUTH.USER);
        result
            .then(response => {
                setUserDataCallback(response.data as TProfileProps);
                if (setUserFetchedCallback) setUserFetchedCallback(true);
            })
            .catch(() => {
                // eslint-disable-next-line
                setUserFetchedCallback && setUserFetchedCallback(true);
            });
    }
}

export default AuthApi;
