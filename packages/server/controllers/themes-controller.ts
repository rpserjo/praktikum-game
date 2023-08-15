import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import type { ISiteTheme } from '../models/themes';
import themeService from '../services/theme-service';
import type { IUserTheme } from '../models/userTheme';
import { ApiError } from '../exeptions/api-error';
import authService from '../services/proxy-auth-service';

class ThemesController {
    createThemes = async (themesData: Omit<ISiteTheme, 'uuid'>[]) => {
        try {
            return await themeService.createManyThemes(themesData);
        } catch (e) {
            return console.error(e);
        }
    };

    createTheme = async (theme: Omit<ISiteTheme, 'uuid'>) => {
        try {
            const [{ dataValues: newTheme }] = await themeService.createTheme(theme);
            return newTheme;
        } catch (e) {
            return console.error(e);
        }
    };

    getThemes = async (): Promise<ISiteTheme[] | void> => {
        try {
            const themesList = await themeService.getThemes();

            if (themesList.length === 0) {
                return [];
            }

            return themesList.map(({ dataValues }) => dataValues);
        } catch (e) {
            return console.error(e);
        }
    };

    getTheme = async (data: {
        uuid?: string;
        name?: string;
    }): Promise<ISiteTheme | undefined | void> => {
        try {
            const response = await themeService.getTheme(data);
            const { dataValues } = response ?? {};
            return dataValues;
        } catch (e) {
            return console.error(e);
        }
    };

    createUserTheme = async (data: {
        themeId: string;
        userId: number;
    }): Promise<IUserTheme | undefined | void> => {
        try {
            const response = await themeService.createUserTheme(data);
            const { dataValues } = response ?? {};
            return dataValues;
        } catch (e) {
            return console.error(e);
        }
    };

    changeUserTheme = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка переданных данных', errors.array()));
            }

            const data = req.body;
            const updated = await themeService.changeUserTheme(data);

            return res.json(updated);
        } catch (e) {
            return console.error(e);
        }
    };

    getUserTheme = async (data: { uuid: string }): Promise<IUserTheme | undefined | void> => {
        try {
            const response = await themeService.getUserTheme(data);
            const { dataValues } = response ?? {};
            return dataValues;
        } catch (e) {
            return console.error(e);
        }
    };

    getUserThemes = async () => {
        try {
            const themesList = await themeService.getUserThemes();

            if (themesList.length === 0) {
                return [];
            }

            return themesList.map(({ dataValues }) => dataValues);
        } catch (e) {
            return console.error(e);
        }
    };

    getUserThemesByUserId = async (userId: number | undefined): Promise<IUserTheme[] | void> => {
        try {
            if (!userId) {
                return [];
            }

            const themesList = await themeService.getUserThemesByUserId(userId);

            if (themesList.length === 0) {
                return [];
            }

            return themesList.map(({ dataValues }) => dataValues);
        } catch (e) {
            return console.error(e);
        }
    };

    getCurrentUserTheme = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка переданных данных', errors.array()));
            }

            const { uuid, authCookie } = req.cookies;
            const { dataValues: user } =
                (await authService.findUserByCookies(uuid, authCookie)) ?? {};

            const response = await themeService.getCurrentUserTheme(user.UserId);
            const { dataValues } = response ?? {};

            const { name, description } =
                ((await this.getTheme({ uuid: dataValues?.themeId })) as ISiteTheme) ?? {};

            return res.json({ name, description });
        } catch (e) {
            return console.error(e);
        }
    };
}

const themesController = new ThemesController();
export default themesController;
