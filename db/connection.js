const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    timezone: '-04:00'
})

module.exports = db;