import { UserRepository } from '../api/UserService';
import AuthApi from '../api/AuthApi';
import { TUser } from '@/store/slices/userSlice';

export class YandexAPIRepository implements UserRepository {
    // eslint-disable-next-line
    async getUserData(): Promise<TUser> {
        const authApi = new AuthApi();

        const { data } = await authApi.getUserData();

        return data;
    }
}
