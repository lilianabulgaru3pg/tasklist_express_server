var mongoose = require('mongoose');

const options = {
    useNewUrlParser: true
};
var mongoDB = 'mongodb://127.0.0.1/todolist';
mongoose.connect(mongoDB, options);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;