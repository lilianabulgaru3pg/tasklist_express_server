var User = require('../models/user');
var Task = require('../models/task');
var mongoose = require('mongoose');

const users = [{
        username: 'test',
        password: 'test1'
    },
    {
        username: 'pop',
        password: 'pop1'
    }
];

async function save(user, task) {
    try {
        const savedUser = await user.save().then(user => user);
        task.user = savedUser._id;
        const savedTask = await task.save().then(task => task);
    } catch (err) {
        console.log('save failed', err);
    }
}

var newUser = new User();
newUser._id = new mongoose.Types.ObjectId();
newUser.username = users[0].username;
newUser.password = newUser.generateHash(users[0].password);

var task1 = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: 'Today',
    items: []
});

User.findOne({
    username: users[0].username
}, (err, user) => {
    if (!user) save(newUser, task1);
});

var secondUser = new User();
secondUser._id = new mongoose.Types.ObjectId();
secondUser.username = users[1].username;
secondUser.password = secondUser.generateHash(users[1].password);

var task2 = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: 'Today',
    items: []
});

User.findOne({
    username: users[1].username
}, (err, user) => {
    if (!user) save(secondUser, task2);
});