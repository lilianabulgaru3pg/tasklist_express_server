var Task = require('../models/task');
var Item = require('../models/item');
var mongoose = require('mongoose');

async function fetchTasks(userID) {
    try {
        const userTasks = await Task.find({
            user: userID
        }, (err, tasks) => tasks);

        var newUsersTask = userTasks.map((val) => ({
            _id: val._id,
            title: val.title
        }));

    } catch (err) {
        console.log(err);
    }
    return newUsersTask;
};

module.exports.fetchUserTasks = fetchTasks;

async function fetchItemsForTaskID(taskID) {
    try {
        var userItemsTasks = await Item.find({
            task_id: taskID
        }, (err, item) => item);

        console.log('userItemsTasks', userItemsTasks);
    } catch (err) {
        console.log(err);
    }
    return userItemsTasks;
}

module.exports.fetchItemsForTaskID = fetchItemsForTaskID;

async function createTask(user_id, data) {
    try {
        let newTask = new Task({
            _id: new mongoose.Types.ObjectId(),
            title: data,
            user: user_id
        });
        var savedTask = await newTask.save();

    } catch (err) {
        console.log(err);
        return false;
    }
    return savedTask;
}

module.exports.createTask = createTask;

async function createItem(taskId, data) {
    try {
        let dbTask = await Task.findOne({ _id: taskId }, (err, document) => {
            console.log('findById', err, document);
        })

        let newItem = new Item({
            _id: new mongoose.Types.ObjectId(),
            title: data,
            task_id: dbTask._id,
            completed: false
        });
        var savedItem = await newItem.save();

    } catch (err) {
        console.log(err);
        return false;
    }
    return savedItem;
}

module.exports.createItem = createItem;

async function updateItem(itemId, completed) {
    try {
        var dbItem = await Item.findByIdAndUpdate(itemId, {
            completed: completed
        });

    } catch (err) {
        console.log(err);
        return false;
    }
    return dbItem;
}
module.exports.updateItem = updateItem;


async function searchForItems(query) {
    try {
        console.log(query.taskId, query.content)
        var dbItems = await Item.find({ task_id: query.taskId, title: new RegExp(query.content, 'i') }
            //  [{ $match: { task_id: query.taskId, title: new RegExp(query.content, 'i') } },
            //  { $group: { _id: '$task_id' } }]
            , (err, items) => {
                err ? Error.throw(err) : false;
                console.log('inside agrregate: items that match query', items);
                return items.length > 0 ? items : false;
            });
        console.log('dbItems', dbItems);
    } catch (err) {
        console.log(err);
    }
    return dbItems;
}

module.exports.searchForItems = searchForItems;

