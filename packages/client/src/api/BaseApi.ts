import axios, { AxiosInstance } from 'axios';
import API from '@/api/api';

abstract class BaseApi {
    protected http: AxiosInstance;

    protected constructor(endpoint: string, host: string = API.HOST) {
        this.http = axios.create({
            baseURL: host + endpoint,
            withCredentials: true,
        });
    }
}

export default BaseApi;
