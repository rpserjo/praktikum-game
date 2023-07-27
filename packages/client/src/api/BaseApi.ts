import axios, { AxiosInstance } from 'axios';
import API from '@/api/api';

abstract class BaseApi {
    protected http: AxiosInstance;

    protected constructor(endpoint: string, hostType = 'external') {
        this.http = axios.create({
            baseURL: `${hostType === 'external' ? API.HOST : API.APP_HOST}` + endpoint,
            withCredentials: true,
        });
    }
}

export default BaseApi;
