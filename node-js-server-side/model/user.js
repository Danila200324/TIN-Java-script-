const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.sync()
    .then(() => {
        console.log('User model synced with the database');
        return User.create({
            email: 'danven@gmail.com',
            password: '12345',
            role: 'admin',
        });
    })
    .then((user) => {
        console.log('User created:', user.toJSON());
    })
    .catch((err) => console.error('Error syncing User model:', err));

module.exports = User;