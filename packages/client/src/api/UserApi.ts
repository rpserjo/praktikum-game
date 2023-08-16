import BaseApi from '@/api/BaseApi';
import API from '@/api/api';

class UserApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.USER.ENDPOINT);
    }

    public user(data: Record<string, string>) {
        return this.http.put(API.ENDPOINTS.USER.PROFILE, data);
    }

    public getAvatar(avatar: File) {
        const form = new FormData();
        form.append('avatar', avatar);
        return this.http.put(API.ENDPOINTS.USER.AVATAR, form);
    }

    public changePassword(data: Record<string, string>) {
        return this.http.put(API.ENDPOINTS.USER.PASSWORD, data);
    }
}

export default UserApi;
