import { randomUUID } from 'crypto';
import type { Model } from 'sequelize-typescript';
import type { ISiteTheme } from '../models/themes';
import type { IUserTheme } from '../models/userTheme';
import { SiteTheme, UserTheme } from '../db';

class ThemeService {
    createManyThemes = async (themesData: Omit<ISiteTheme, 'uuid'>[]) => {
        const existingThemes = await SiteTheme.findAll();
        const existingThemesNames = existingThemes.map(({ dataValues }) => dataValues.name);

        const themesObjectsList = themesData.flatMap(({ name, description }) => {
            if (!existingThemesNames.includes(name)) {
                return {
                    name,
                    description,
                    uuid: randomUUID(),
                };
            }

            return [];
        });

        await SiteTheme.bulkCreate(themesObjectsList);
    };

    createTheme = async (
        theme: Omit<ISiteTheme, 'uuid'>
    ): Promise<[Model<ISiteTheme, ISiteTheme>, boolean]> => {
        const { name, description } = theme;

        return SiteTheme.findOrCreate({
            where: { name },
            defaults: {
                name,
                description,
                uuid: randomUUID(),
            },
        });
    };

    getThemes = async (): Promise<Model<ISiteTheme, ISiteTheme>[]> => {
        const data = await SiteTheme.findAll({
            order: [['name', 'ASC']],
        });

        return data;
    };

    getTheme = async ({
        uuid,
        name,
    }: {
        uuid?: string;
        name?: string;
    }): Promise<Model<ISiteTheme, ISiteTheme> | null> => {
        const where = uuid ? { uuid } : { name };
        return SiteTheme.findOne({ where });
    };

    createUserTheme = async ({
        themeId,
        userId,
    }: {
        themeId: string;
        userId: number;
    }): Promise<Model<IUserTheme, IUserTheme> | null> => {
        const data = await UserTheme.create({
            themeId,
            userId,
            uuid: randomUUID(),
        });

        return data;
    };

    changeUserTheme = async ({
        themeName,
        userId,
    }: {
        themeName: string;
        userId: string;
    }): Promise<{ name: string; description: string } | undefined> => {
        const response = await this.getTheme({ name: themeName });
        const { dataValues } = response ?? {};

        if (dataValues) {
            const { name, description } = dataValues;

            const result = await UserTheme.update(
                {
                    themeId: dataValues?.uuid,
                },
                {
                    where: {
                        userId,
                    },
                    returning: true,
                }
            );

            if (result) {
                return { name, description };
            }

            return undefined;
        }

        return undefined;
    };

    getUserTheme = async ({
        uuid,
    }: {
        uuid: string;
    }): Promise<Model<IUserTheme, IUserTheme> | null> => UserTheme.findOne({ where: { uuid } });

    getUserThemes = async (): Promise<Model<IUserTheme, IUserTheme>[]> => UserTheme.findAll();

    getUserThemesByUserId = async (userId: number): Promise<Model<IUserTheme, IUserTheme>[]> => {
        const options = {
            where: {
                userId,
            },
        };

        return UserTheme.findAll(options);
    };

    getCurrentUserTheme = async (userId: number): Promise<Model<IUserTheme, IUserTheme> | null> => {
        const options = {
            where: {
                userId,
            },
        };

        return UserTheme.findOne(options);
    };
}

const themeService = new ThemeService();
export default themeService;
