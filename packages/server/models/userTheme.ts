import type { ModelAttributes } from 'sequelize/types';
import { DataType, Model } from 'sequelize-typescript';

export interface IUserTheme {
    uuid: string;
    themeId?: string;
}

export const userTheme: ModelAttributes<Model, IUserTheme> = {
    uuid: {
        type: DataType.UUID,
        primaryKey: true,
    },
};
