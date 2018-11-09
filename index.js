const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcrypt-nodejs');
const multer = require('multer');
var upload = multer();

var userRouter = require('./routes/userRouter.js');
var passport = require('./utils/passport.js');

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(session({
    genid: (req) => {
        console.log('Inside session middleware genid function');
        return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(express.static('../TodoListApp/dist/'));

app.post('/user-tasks', upload.none(), userRouter);
app.get('/authrequired/user-tasks', userRouter);

app.listen(8080, () => {
    console.log('Listening on localhost:8080')
});

module.exports = app;