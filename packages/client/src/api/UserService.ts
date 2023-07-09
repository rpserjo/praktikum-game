import { TUser } from '@/store/slices/userSlice';

export interface UserRepository {
    getUserData(): Promise<TUser>;
}

export class UserService {
    // eslint-disable-next-line
    constructor(private repo: UserRepository) {}

    getUserData() {
        return this.repo.getUserData();
    }
}
