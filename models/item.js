var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = Schema({
    _id: Schema.Types.ObjectId,
    task_id: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    title: String,
    completed: Boolean
});

module.exports = mongoose.model('Item', itemSchema)