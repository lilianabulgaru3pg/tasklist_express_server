var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String
    // items: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Item'
    // }]
});

module.exports = mongoose.model('Task', taskSchema);