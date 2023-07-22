import { DataType, Model } from 'sequelize-typescript';
// import { sequelize } from '../init';
import type { ModelAttributes } from 'sequelize/types';

export const Reactions = {
    like: '👍',
    hmm: '🫤',
    heart: '❤️',
    ghost: '👻',
    fire: '🔥',
    the_doors: '🫃',
} as const;

export type Reaction = {
    reactions: typeof Reactions;
};

export const reactionModel: ModelAttributes<Model, Reaction> = {
    reactions: {
        type: DataType.ENUM,
        values: [
            Reactions.like,
            Reactions.hmm,
            Reactions.heart,
            Reactions.ghost,
            Reactions.fire,
            Reactions.the_doors,
        ],
    },
};
