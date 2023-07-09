import { AxiosError } from 'axios';
import BaseApi from './BaseApi';
import API from '@/api/api';
import { TOAuthInData } from '@/models/models';

type ErrorResponse = {
    reason: string;
};

class OAuthApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.OAUTH.ENDPOINT);
    }

    public async getServiceId(redirectUri: string): Promise<string> {
        const result = this.http.get(
            `${API.ENDPOINTS.OAUTH.SERVICEID}?redirect_uri=${redirectUri}`
        );

        return result
            .then(res => {
                const {
                    data: { service_id },
                } = res;

                return service_id;
            })
            .catch((response: AxiosError) => {
                const responseData = response.response?.data;
                console.debug(responseData);
            });
    }

    public async oAuthIn(
        data: TOAuthInData,
        proceedCallback: () => void,
        errorCallback: (error: string) => void
    ): Promise<void> {
        const result = this.http.post('', data);

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
}

export default OAuthApi;
