const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    contact_phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    contact_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
});

Book.belongsTo(User, { foreignKey: 'userId' });
module.exports = Book;
