import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface IAuth {
    uuid: string;
    authCookie: string;
    expires: Date;
}

export const authModel: ModelAttributes<Model, IAuth> = {
    uuid: {
        type: DataType.UUID,
        primaryKey: true,
        autoIncrement: false,
    },
    authCookie: {
        type: DataType.STRING,
        allowNull: false,
    },
    expires: {
        type: DataType.DATE,
        allowNull: false,
    },
};
