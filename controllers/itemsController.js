var User = require('../models/item');
var dbManager = require('../db/databaseManager');

exports.get_items = ((req, res, next) => {
    return res.json({ test: 'success' });
});