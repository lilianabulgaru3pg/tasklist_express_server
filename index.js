const express = require('express');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const multer = require('multer');
var upload = multer();

const users = [{
        id: '2f24vvg',
        username: 'test',
        password: 'test'
    },
    {
        id: 'tyu97',
        username: 'pop',
        password: 'pop'
    }
];

passport.use(new LocalStrategy({
        usernameField: 'username'
    },
    (username, password, done) => {
        console.log('Inside local strategy callback');
        const user = users.find((user) => (user.password === password && user.username === username));
        if (user && username === user.username && password === user.password) {
            console.log('Local strategy returned true')
            return done(null, user)
        }
    }
));

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback', id);
    let user = users.find((user) => user.id === id);
    user ? done(null, user) : false;
});

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

app.post('/user-tasks', upload.none(), (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log('passport', err, user, info);
        if (info) {
            return res.send(info.message)
        }
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/');
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/authrequired/user-tasks');
        })
    })(req, res, next);
});

app.get('/authrequired/user-tasks', (req, res) => {
    console.log('Inside GET /authrequired callback');
    if (req.isAuthenticated()) {
        res.send(`User is authenticated ${req.isAuthenticated()}`);
    } else {
        res.redirect('/');
    }
})

app.listen(8080, () => {
    console.log('Listening on localhost:8080')
});