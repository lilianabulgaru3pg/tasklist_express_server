var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var users = require('../utils/generateUsers');

passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {
        console.log('Inside local strategy callback');
        User.findOne({
            'username': username
        }, function (err, user) {
            console.log('user', user, 'err', err);
            if (err) {
                return done(null, false);
            }
            if (!user)
                return done(null, false);

            if (!user.validPassword(password)) {
                console.log('validPassword false');
                return done(null, false, );
            }
            console.log('Local strategy returned true');
            return done(null, user);
        });
    }));

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here', user._id)
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback', id);
    User.findOne({
        '_id': id,
    }, function (err, user) {
        console.log('deserializeUser', user, err);
        user ? done(null, user) : false;
    });
});

module.exports = passport;