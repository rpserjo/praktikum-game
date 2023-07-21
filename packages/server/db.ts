import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { userModel } from './models/user';
import { topicModel } from './models/topic';
import { commentModel } from './models/comment';
import { replyModel } from './models/reply';
import { reactionModel } from './models/reaction';
import { authModel } from './models/auth';

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
export const Auth = sequelize.define('Auth', authModel, {});

/*: TODO User Auth
 User.hasMany(Topic)
 User.hasMany(Comment)
 Topic.belongsTo(User)
 Comment.belongsTo(User)
*/

User.hasMany(Auth);
Auth.belongsTo(User);
Topic.hasMany(Comment, { foreignKey: { allowNull: false } });
Comment.belongsTo(Topic);
Comment.hasMany(Reply, { foreignKey: { allowNull: false } });
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

export async function dbConnect() {
    try {
        console.log(
            'try connect db with',
            POSTGRES_HOST,
            POSTGRES_USER,
            POSTGRES_PASSWORD,
            POSTGRES_DB,
            POSTGRES_PORT
        );
        await sequelize.authenticate(); // Проверка аутентификации в БД
        await sequelize.sync({ alter: true }); // Синхронизация базы данных
        console.log(' ➜ 🎸 Connection to db has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
