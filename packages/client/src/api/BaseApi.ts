import axios, { AxiosInstance } from 'axios';
import API from '@/api/api';

export const HostOptions = {
    APP_HOST: 1,
    EXTERNAL_HOST: 2,
};
abstract class BaseApi {
    protected http: AxiosInstance;

    protected constructor(endpoint: string, hostType = HostOptions.EXTERNAL_HOST) {
        this.http = axios.create({
            baseURL:
                `${hostType === HostOptions.EXTERNAL_HOST ? API.HOST : API.APP_HOST}` + endpoint,
            withCredentials: true,
        });
    }
}

export default BaseApi;
