import type { UUID } from 'crypto';
import { Auth, Op } from '../db';

class AuthService {
    addCookie(Cookie: string, login?: string) {
        const parseCookie = Cookie.match(/.*authCookie=([^;]*);.*Expires=(.+GMT);.*uuid=([\w-]*)/);
        if (parseCookie) {
            const UUID = parseCookie[3];
            const expires = Date.parse(parseCookie[2]);
            const authCookie = parseCookie[1];

            return Auth.findOrCreate({
                where: { uuid: `${UUID}` },
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
