var User = require('../models/user');
var passport = require('../utils/passport');

exports.user_tasks = ((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log('passport', err, user, info);
        if (info) {
            return res.send(info.message)
        }
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/');
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/authrequired/user-tasks');
        })
    })(req, res, next);
});

exports.user_authrequired = ((req, res) => {
    console.log('Inside GET /authrequired callback');
    if (req.isAuthenticated()) {
        res.send(`User is authenticated ${req.isAuthenticated()}`);
    } else {
        res.redirect('/');
    }
});