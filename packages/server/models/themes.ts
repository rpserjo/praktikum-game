import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface ISiteTheme {
    uuid: string;
    name: string;
    description: string;
}

export const siteTheme: ModelAttributes<Model, ISiteTheme> = {
    uuid: {
        type: DataType.UUID,
        primaryKey: true,
    },
    name: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataType.STRING,
        allowNull: false,
    },
};
