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
    console.log('Inside GET /tasks callback');
    return res.status(200);
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
    return res.status(200).json(body);
});

exports.create_task = (async (req, res, next) => {
    let saveTask = ((id, title) => dbManager.createTask(id, title));
    let body = await saveTask(req.user._id, req.body.title);
    return body ? res.status(201).json(body) : res.status(409)
});

exports.create_item = (async (req, res, next) => {
    let saveItem = ((id, text) => dbManager.createItem(id, text));
    let createdItem = await saveItem(req.params.taskId, req.body.text);
    console.log('item created', createdItem);
    return createdItem ? res.status(201).json(createdItem) : res.status(409)
});

exports.update_item = (async (req, res, next) => {
    let modifyItem = ((itemId, completed) => dbManager.updateItem(itemId, completed));
    let updatedItem = await modifyItem(req.params.itemId, req.body.completed);
    console.log('update item', updatedItem);
    return updatedItem ? res.status(204).json(updatedItem) : res.status(409);
});

exports.user_logout = ((req, res) => {
    req.logout();
    console.log('logged in user', req.user);
    return res.status(200).json({ status: 'logged out' });
    // res.redirect('/');
});

exports.item_search = (async (req, res) => {
    console.log('item_search ', req.query.content)
    var dbItems = await ((query) => dbManager.searchForItems(query))(req.query)
    console.log('dbItems', dbItems);
    return dbItems ? res.status(200).json(dbItems) : res.status(400);
});