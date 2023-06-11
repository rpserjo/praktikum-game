import axios, { AxiosInstance } from 'axios';
import API from '@/api/api';

abstract class BaseApi {
    protected http: AxiosInstance;

    protected constructor(endpoint: string) {
        this.http = axios.create({
            baseURL: API.HOST + endpoint,
            withCredentials: true,
        });
    }
}

export default BaseApi;
