const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const multer = require('multer');
var upload = multer();

require('./utils/database');
var userRouter = require('./routes/userRouter.js');
var passport = require('./utils/passport.js');

const PORT = 8080;
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({
    genid: () => {
        console.log('Inside session middleware genid function');
        return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'wur8734r837e8wuidks932qwias',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
// app.use(express.static('../TodoListApp/dist/'));
app.use(express.static('../TodoListApp/src/'));
app.use(express.static('../TodoListApp/src/main.css'));
// app.use(express.static('../TodoListApp/src/index.js'));

app.post('/user-tasks', upload.none(), userRouter);
// app.get('/user-tasks', isLoggedIn, userRouter);
app.get('/user-tasks', userRouter);

function isLoggedIn(req, res, next) {
    console.log('isLoggedIn', req.isAuthenticated());
    if (req.isAuthenticated()) {
        return res.redirect('/user-tasks');
    }
    res.redirect('/');
}

app.listen(PORT, () => {
    console.log('Listening on localhost:8080')
});

module.exports = app;