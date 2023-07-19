import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { userModel } from './models/user';
import { topicModel } from './models/topic';
import { commentModel } from './models/comment';
import { replyModel } from './models/reply';
import { reactionModel } from './models/reaction';

dotenv.config({ path: '../../.env' });

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

const sequelizeOptions: SequelizeOptions = {
    host: POSTGRES_HOST || 'localhost',
    port: +POSTGRES_PORT!,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
};

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions);

// Инициализируем модели
export const User = sequelize.define('User', userModel, {});
export const Topic = sequelize.define('Topic', topicModel, {});
export const Comment = sequelize.define('Comment', commentModel, {});
export const Reply = sequelize.define('Reply', replyModel, {});
export const Reaction = sequelize.define('Reaction', reactionModel, {});

/*: TODO User Auth
 User.hasMany(Topic)
 User.hasMany(Comment)
 Topic.belongsTo(User)
 Comment.belongsTo(User)
*/

Topic.hasMany(Comment);
Comment.belongsTo(Topic);
Comment.hasMany(Reply);
Comment.hasMany(Reaction, {
    foreignKey: 'reactableId',
    constraints: false,
    scope: {
        commentableType: 'comment',
    },
});
Reply.belongsTo(Comment);
Reply.hasMany(Reaction, {
    foreignKey: 'reactableId',
    constraints: false,
    scope: {
        commentableType: 'reply',
    },
});
Reaction.belongsTo(Comment, { foreignKey: 'reactableId', constraints: false });
Reaction.belongsTo(Reply, { foreignKey: 'reactableId', constraints: false });

console.log(
    'try connect db with',
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT
);

export async function dbConnect() {
    try {
        await sequelize.authenticate(); // Проверка аутентификации в БД
        await sequelize.sync(); // Синхронизация базы данных
        console.log(' ➜ 🎸 Connection to db has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
