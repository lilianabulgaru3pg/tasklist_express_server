var User = require('../models/item');
var dbManager = require('../db/databaseManager');

exports.get_items = ((req, res, next) => {
    console.log('Inside GET items', req.params.trackId);
    return res.json({ test: 'success' });
});