var User = require('../models/user');
var passport = require('../utils/passport');
var dbManager = require('../db/databaseManager');

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
            const getUserTasks = (id) => dbManager.fetchUserTasks(id);
            const body = await getUserTasks(user._id);
            res.status(200);
            console.log(body);
            return res.json(body);
        })
    })(req, res, next);
});

exports.user_authrequired = ((req, res, next) => {
    console.log('Inside GET /user-tasks callback');
    return
});

exports.user_taskId = ((req, res, next) => {
    console.log('Inside GET /:taskId callback');
    return res.redirect('/items');
});

exports.get_items = (async (req, res, next) => {
    console.log('Inside GET items', req.params.taskId);
    const getItemsforTask = ((taskId) => dbManager.fetchItemsForTaskID(taskId));
    var taskId = req.params.taskId;
    const body = await getItemsforTask(taskId);
    return res.json(body);
});