import BaseApi from './BaseApi';
import API from '@/api/api';
import { TOAuthInData } from '@/models/models';

type TServiceIdRequestData = {
    serviceId: string | null;
    error: Error | null;
};

class OAuthApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.OAUTH.ENDPOINT);
    }

    public async getServiceId(redirectUri: string): Promise<TServiceIdRequestData> {
        try {
            const result = await this.http.get(
                `${API.ENDPOINTS.OAUTH.SERVICEID}?redirect_uri=${redirectUri}`
            );

            const {
                data: { service_id },
            } = result;

            return { serviceId: service_id, error: null };
        } catch (error: unknown) {
            console.debug(error);
            return { serviceId: null, error: error as Error };
        }
    }

    public async oAuthIn(
        data: TOAuthInData,
        proceedCallback: () => void,
        errorCallback: (error: string) => void
    ): Promise<void> {
        try {
            await this.http.post('', data);
            proceedCallback();
        } catch (error: unknown) {
            const { message } = error as Error;

            if (message === 'User already in system') {
                proceedCallback();
            } else {
                errorCallback(message);
            }
        }
    }
}

export default OAuthApi;
