import { DataType, Model } from 'sequelize-typescript';
// import { Topic, sequelize } from '../init';
import type { ModelAttributes } from 'sequelize/types';

export type TopicCreationAttributes = {
    topic: string;
    message: string;
    author: string;
};

export type TopicAttributes = {
    id: number;
    topic: string;
    message: string;
    createdAt: string;
    UserId: number;
};

export const topicModel: ModelAttributes<Model, TopicCreationAttributes> = {
    topic: {
        type: DataType.STRING,
        allowNull: false,
    },
    message: {
        type: DataType.STRING(2000),
    },
    author: {
        type: DataType.STRING,
    },
};
