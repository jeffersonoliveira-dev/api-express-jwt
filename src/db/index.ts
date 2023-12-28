import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'user_auth_user',
    password: process.env.DB_PASSWORD || 'user_auth_password',
    database: process.env.DB_NAME || 'user_auth_db',
  })

export default sequelize