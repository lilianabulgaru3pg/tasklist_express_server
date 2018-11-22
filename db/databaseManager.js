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

async function createItem(taskid, data) {
    try {
        let dbTask = await Task.findOne({ _id: taskid }, (err, document) => {
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
        let dbItem = await Item.findByIdAndUpdate(itemId, {
            completed: completed
        });

    } catch (err) {
        console.log(err);
        return false;
    }
    return true
}
module.exports.updateItem = updateItem;

