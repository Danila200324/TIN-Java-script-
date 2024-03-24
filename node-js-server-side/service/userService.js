const User = require('../model/user');

const createUser = async (userData) => {
    try {
        const existingUser = await User.findOne({
        where: { email: userData.email }
    });
        if (existingUser) {
            throw new Error('User with this email already exists');
        } else {
            return await User.create(userData);
        }
    } catch (error) {
        throw new Error('Error creating the user: ' + error.message);
    }
};

const findUserByEmail = async (email) => {
    try {
        return await User.findOne({
            where: {email: email.toString()},
        })
    } catch (error) {
        throw new Error('Error finding user by email: ' + error.message);
    }
};

const findUserById = async (userId) => {
    try {
        return await User.findByPk(userId)
    } catch (error) {
        throw new Error('Error finding user by id: ' + error.message);
    }
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};
