var User = require('../models/user');
var Task = require('../models/task');
var Item = require('../models/item');
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

var newUser = new User();
newUser._id = new mongoose.Types.ObjectId();
newUser.username = users[0].username;
newUser.password = newUser.generateHash(users[0].password);

var task1 = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: 'Today-Task',
    items: []
});

var task2 = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: 'Tomorrow-Task',
    items: []
});

var item1 = new Item({
    _id: new mongoose.Types.ObjectId(),
    title: 'First Item',
    completed: false
});

var item2 = new Item({
    _id: new mongoose.Types.ObjectId(),
    title: 'Second Item',
    completed: false
});

var item3 = new Item({
    _id: new mongoose.Types.ObjectId(),
    title: 'Third Item',
    completed: false
});

User.findOne({
    username: newUser.username
}, (err, user) => {
    if (!user)
        saveDataForNewUser();
});

async function saveDataForNewUser() {
    try {
        const savedUser = await newUser.save().then(user => user);
        task1.user = savedUser._id;
        const savedTask1 = await task1.save().then(task => task);
        task2.user = savedUser._id;
        const savedTask2 = await task2.save().then(task => task);
        item1.task_id = savedTask1;

        item1.task_id = savedTask1._id;
        item2.task_id = savedTask1._id;
        item3.task_id = savedTask2._id;
        const item1List = await item1.save().then(item => item);
        const item2List = await item2.save().then(item => item);
        const item3List = await item3.save().then(item => item);
    } catch (err) {
        console.log('save failed', err);
    }
}

var secondUser = new User();
secondUser._id = new mongoose.Types.ObjectId();
secondUser.username = users[1].username;
secondUser.password = secondUser.generateHash(users[1].password);

var item4 = new Item({
    _id: new mongoose.Types.ObjectId(),
    title: 'Fourth Item',
    completed: false
});

var task3 = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: 'Task1',
});

User.findOne({
    username: secondUser.username
}, (err, user) => {
    if (!user) saveDataForSecondUser();
});

async function saveDataForSecondUser() {
    try {
        const savedUser = await secondUser.save();
        task3.user = savedUser._id;
        const savedTask = await task3.save();
        item4.task_id = savedTask._id;
        const itemList = await item4.save();
    } catch (err) {
        console.log('save failed', err);
    }
}