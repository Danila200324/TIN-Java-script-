const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userService = require('../service/userService');

async function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await userService.findUserByEmail(email);
            if (!user) {
                return done(null, false, { message: 'No user with that email' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userService.findUserById(id);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });
}

module.exports = initialize;
