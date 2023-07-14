import { randomUUID } from 'crypto';
import { SiteTheme, UserTheme } from '../db';
import type { ISiteTheme } from '../models/themes';

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

    createTheme = async (theme: Omit<ISiteTheme, 'uuid'>) => {
        const { name, description } = theme;
        await SiteTheme.findOrCreate({
            where: { name },
            defaults: {
                name,
                description,
                uuid: randomUUID(),
            },
        });
    };

    getThemes = async () => {
        const themesList = await SiteTheme.findAll({
            order: [['name', 'ASC']],
        });

        if (themesList.length === 0) {
            return [];
        }

        return themesList.map(({ dataValues }) => dataValues);
    };

    getTheme = async ({ uuid, name }: { uuid?: string; name?: string }) => {
        const where = uuid ? { uuid } : { name };
        const { dataValues } = (await SiteTheme.findOne({ where })) ?? {};
        return dataValues;
    };

    createUserTheme = async ({ themeId, userId }: { themeId: string; userId: string }) => {
        const { dataValues } = (await UserTheme.create({ themeId, userId })) ?? {};
        return dataValues;
    };
}

const themeService = new ThemeService();
export default themeService;
