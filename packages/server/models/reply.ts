import { DataType, Model } from 'sequelize-typescript';
// import { sequelize } from '../init';
import type { ModelAttributes } from 'sequelize/types';

export type Reply = {
    message: string;
    author: string;
};

export const replyModel: ModelAttributes<Model, Reply> = {
    message: {
        type: DataType.STRING(2000),
    },
    author: {
        type: DataType.STRING,
    },
};
