var Task = require('../models/task');
var Items = require('../models/item');

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
        var userItemsTasks = await Items.find({
            task_id: taskID
        }, (err, item) => item);

        console.log('userItemsTasks', userItemsTasks);
    } catch (err) {
        console.log(err);
    }
    return userItemsTasks;
}

module.exports.fetchItemsForTaskID = fetchItemsForTaskID;