import { DataType, Model } from 'sequelize-typescript';
// import { sequelize } from '../init';
import type { ModelAttributes } from 'sequelize/types';

export type Reaction = {
    reactionData: string;
};

export const reactionModel: ModelAttributes<Model, Reaction> = {
    reactionData: {
        type: DataType.STRING,
    },
};
