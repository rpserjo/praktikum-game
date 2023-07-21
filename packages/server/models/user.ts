import { DataType, Model } from 'sequelize-typescript';
// import { sequelize } from '../init';
import type { ModelAttributes } from 'sequelize/types';

export interface IUser {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    avatar: string;
}

export const userModel: ModelAttributes<Model, IUser> = {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    first_name: {
        type: DataType.STRING,
        allowNull: false,
    },
    second_name: {
        type: DataType.STRING,
    },
    display_name: {
        type: DataType.STRING,
    },
    login: {
        type: DataType.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataType.STRING(500),
    },
};
