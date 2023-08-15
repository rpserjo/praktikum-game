import type { UUID } from 'crypto';
import { Auth, Op } from '../db';

class AuthService {
    addCookie(Cookie: string, login?: string) {
        const parseAuthCookie = Cookie.match(/.*authCookie=([^;]*);.*?Expires=(.+?GMT);/);
        const parseUUIDs = Cookie.match(/.*uuid=([\w-]*)/);

        if (parseAuthCookie && parseUUIDs && parseUUIDs[1]) {
            const expires = Date.parse(parseAuthCookie[2]);
            const authCookie = parseAuthCookie[1];

            return Auth.findOrCreate({
                where: { uuid: `${parseUUIDs[1]}` },
                defaults: { authCookie, login, expires },
            });
        }
        return console.log('not found Cookie');
    }

    findCookieById(uuid: UUID) {
        return Auth.findByPk(uuid);
    }

    updateExpires(uuid: UUID, expires: Date) {
        return Auth.update(
            { expires: `${expires}` },
            {
                where: {
                    uuid: `${uuid}`,
                },
            }
        );
    }

    updateUserId(uuid: UUID, UserId: number) {
        return Auth.update(
            { UserId: `${UserId}` },
            {
                where: {
                    uuid: `${uuid}`,
                },
            }
        );
    }

    async findUpdateExpires(uuid: UUID, expires: Date) {
        if ((await this.findCookieById(uuid)) !== null) {
            this.updateExpires(uuid, expires);
        }
    }

    findUserByCookies(uuid: UUID, authCookie: string) {
        return Auth.findOne({
            where: {
                [Op.and]: [{ uuid: `${uuid}` }, { authCookie: `${authCookie}` }],
            },
        });
    }

    checkUserAuth(uuid: UUID, authCookie: string) {
        return Auth.findOne({
            where: {
                [Op.and]: [
                    { uuid: `${uuid}` },
                    { authCookie: `${authCookie}` },
                    { expires: { [Op.gte]: Date.now() } },
                ],
            },
        });
    }
}
const authService = new AuthService();
export default authService;
