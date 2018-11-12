var User = require('../models/user');
var passport = require('../utils/passport');

exports.user_tasks = ((req, res, next) => {
    console.log('inside user_tasks request');
    passport.authenticate('local-login', (err, user, info) => {
        console.log('passport', err, user, info);
        if (info) {
            return res.status('401');
            //return res.send(info.message)
        }
        if (err) {
            //return next(err);
            return res.status('404');
        }
        if (!user) {
            return res.status('401');
            //res.redirect('/');
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            //return res.redirect('/user-tasks');
            return res.status('200');
        })
    })(req, res, next);
});

exports.user_authrequired = ((req, res) => {
    console.log('Inside GET /authrequired callback');
    res.status("200");
});