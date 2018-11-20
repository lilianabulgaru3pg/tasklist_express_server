var express = require('express');
var router = express.Router();

var items_controller = require('../controllers/itemsController');

router.get('/items', items_controller.get_items);

module.exports = router;