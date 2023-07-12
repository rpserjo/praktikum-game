import { TUser } from '@/store/slices/userSlice';

export interface UserRepository {
    getUserData(): Promise<TUser>;
}
export class UserService {
    constructor(private repo: UserRepository) {}

    getUserData() {
        return this.repo.getUserData();
    }
}
