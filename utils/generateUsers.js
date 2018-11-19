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
    title: 'Today Task',
    items: []
});

var task2 = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: 'Tomorrow Task',
    items: []
});

var item1 = new Item({
    _id: new mongoose.Types.ObjectId(),
    title: 'first Item',
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
        const itemList = await item1.save().then(item => item);
        task1.user = savedUser._id;
        task1.items.push(itemList._id);
        const savedTask = await task1.save().then(task => task);
        task2.user = savedUser._id;
        const savedTask2 = await task2.save().then(task => task);
    } catch (err) {
        console.log('save failed', err);
    }
}

var secondUser = new User();
secondUser._id = new mongoose.Types.ObjectId();
secondUser.username = users[1].username;
secondUser.password = secondUser.generateHash(users[1].password);

var task3 = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: 'Today Task',
    items: []
});

User.findOne({
    username: secondUser.username
}, (err, user) => {
    if (!user) saveDataForSecondUser();
});

async function saveDataForSecondUser() {
    try {
        const savedUser = await secondUser.save().then(user => user);
        task3.user = savedUser._id;
        const savedTask = await task3.save().then(task => task);
    } catch (err) {
        console.log('save failed', err);
    }
}