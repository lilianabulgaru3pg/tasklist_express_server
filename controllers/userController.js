var User = require('../models/user');
var passport = require('../utils/passport');
var dbManager = require('../db/databaseManager');

const getUserTasks = (id) => dbManager.fetchUserTasks(id);

exports.user_tasks = ((req, res, next) => {
    console.log('inside user_tasks request');
    passport.authenticate('local-login', (err, user, info) => {
        console.log('passport', err, user, info);
        if (info)
            return res.status(401);

        if (err)
            return next(err);

        if (!user)
            return res.status(401);

        req.login(user, async (err) => {
            if (err) {
                return next(err);
            }

            const body = await getUserTasks(user._id);
            res.status(200);
            console.log(body);
            return res.json(body);
        })
    })(req, res, next);
});

exports.user_authrequired = ((req, res) => {
    console.log('Inside GET /authrequired callback');
    res.status(200);
});