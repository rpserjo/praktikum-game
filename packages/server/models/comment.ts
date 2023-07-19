import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export type Comment = {
    message: string;
};

export const commentModel: ModelAttributes<Model, Comment> = {
    message: {
        type: DataType.STRING,
    },
};
