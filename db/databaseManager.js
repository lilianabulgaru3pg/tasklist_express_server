var Task = require('../models/task');

async function fetchTasks(userID) {
    try {
        const userTasks = await Task.find({
            user: userID
        }, (err, tasks) => tasks);

        var newUsersTask = userTasks.map((val) => ({
            items: val.items,
            title: val.title
        }));

    } catch (err) {
        console.log(err);
    }
    return newUsersTask;
};
module.exports.fetchUserTasks = fetchTasks;