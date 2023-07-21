import type { UUID } from 'crypto';
import { User } from '../db';
import type { IUser } from '../models/user';
import authService from './proxy-auth-service';

class UserService {
    async createUserUpdCoockie(userObj: IUser, cookie: string) {
        const { id, first_name, second_name, display_name, login, avatar } = userObj;

        if (id) {
            await User.findOrCreate({
                where: { id: `${id}` },
                defaults: {
                    first_name,
                    second_name,
                    display_name,
                    login,
                    avatar,
                },
            });

            const cookieParse = cookie.match(/uuid=([\w-]*)/);

            if (cookieParse) {
                const uuid = cookieParse[1] as UUID;
                authService.updateUserId(uuid, id);
            }
        }
    }

    async findUserById(id: number) {
        return User.findByPk(id);
    }
}

const userService = new UserService();
export default userService;
