var User = require('../models/user');

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
newUser.username = users[0].username;
newUser.password = newUser.generateHash(users[0].password);
newUser.save(function (err) {
    console.log('first user saved to db')
    if (err) console.log(err);
});

var secondUser = new User();
secondUser.username = users[1].username;
secondUser.password = secondUser.generateHash(users[1].password);
secondUser.save(function (err) {
    console.log('second user saved to db')
    if (err) console.log(err);
});