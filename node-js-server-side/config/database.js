const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'bestuser',
    password: 'bestuser',
    database: 'books',
});

module.exports = sequelize;




