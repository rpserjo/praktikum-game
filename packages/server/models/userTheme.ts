import type { ModelAttributes } from 'sequelize/types';
import { DataType, Model } from 'sequelize-typescript';

interface IUserTheme {
    uuid: string;
}

export const userTheme: ModelAttributes<Model, IUserTheme> = {
    uuid: {
        type: DataType.UUID,
        primaryKey: true,
    },
};
