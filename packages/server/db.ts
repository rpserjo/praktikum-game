import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Op } from 'sequelize';
import dotenv from 'dotenv';
import { userModel } from './models/user';
import { topicModel } from './models/topic';
import { commentModel } from './models/comment';
import { replyModel } from './models/reply';
import { reactionModel } from './models/reaction';
import { authModel } from './models/auth';
import { userTheme } from './models/userTheme';
import { siteTheme } from './models/themes';
import ThemeService from './servises/theme-service';

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
export const UserTheme = sequelize.define('UserTheme', userTheme, {});
export const Topic = sequelize.define('Topic', topicModel, {});
export const Comment = sequelize.define('Comment', commentModel, {});
export const Reply = sequelize.define('Reply', replyModel, {});
export const Reaction = sequelize.define('Reaction', reactionModel, { updatedAt: false });
export const Auth = sequelize.define('Auth', authModel, {});
export const SiteTheme = sequelize.define('SiteTheme', siteTheme, {});

User.hasMany(Topic);
User.hasMany(Comment);
User.hasMany(Reply);
User.hasOne(UserTheme, { foreignKey: { name: 'userId', allowNull: false } });
UserTheme.belongsTo(SiteTheme, { foreignKey: { name: 'themeId', allowNull: false } });
Topic.belongsTo(User);
Comment.belongsTo(User);
User.hasMany(Auth);
Auth.belongsTo(User);
Topic.hasMany(Comment, { foreignKey: { allowNull: false } });
Comment.belongsTo(Topic);
Comment.hasMany(Reply, { foreignKey: { allowNull: false } });
Comment.hasMany(Reaction, { foreignKey: { allowNull: false } });
Reply.belongsTo(Comment);
Reply.belongsTo(User);
Reaction.belongsTo(Comment);
Reaction.belongsTo(User);

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
        await sequelize.sync(); // Синхронизация базы данных

        // Создание основных цветовых тем сайта
        await ThemeService.createManyThemes([
            { name: 'light', description: 'Light theme for site' },
            { name: 'dark', description: 'Dark theme for site' },
        ]);

        console.log(' ➜ 🎸 Connection to db has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
export { Op };
