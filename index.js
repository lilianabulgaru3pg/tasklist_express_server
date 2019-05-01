const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const multer = require('multer');
var upload = multer();
var cors = require('cors')

var db = require('./utils/database');
var userRouter = require('./routes/userRouter.js');
var passport = require('./utils/passport.js');

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({
    genid: (req) => {
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
app.use(express.static('../TodoListApp/dist/'));
app.use(cors());
// app.use(express.static('../TodoListApp/src/'));
// app.use(express.static('../TodoListApp/src/main.css'));
// app.use(express.static('../TodoListApp/src/index.js'));

app.post('/tasks', upload.none(), userRouter);
app.get('/tasks', isLoggedIn, userRouter);
app.get('/logout', userRouter);
app.get('/tasks/:taskId', userRouter);
app.get('/tasks/:taskId/items', userRouter);
app.post('/tasks/add-task', userRouter);
app.post('/tasks/:taskId/add-item', userRouter);
app.put('/tasks/:itemId/', userRouter);
app.get('/tasks/search', userRouter);

function isLoggedIn(req, res, next) {
    console.log('isLoggedIn', req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    }
    res.redirect('/');
}
app.listen(PORT, () => {
    console.log('Listening on localhost:3000')
});

module.exports = app;