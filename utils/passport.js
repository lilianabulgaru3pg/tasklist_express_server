const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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

module.exports = passport;