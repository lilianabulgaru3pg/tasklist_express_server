var express = require('express');
var router = express.Router();
var itemsRouter = require('./itemsRouter');

var user_controller = require('../controllers/userController');

router.post('/user-tasks', user_controller.user_tasks);
router.get('/user-tasks', user_controller.user_authrequired);
router.get('/user-tasks/:taskId', user_controller.user_taskId);
router.get('/user-tasks/:taskId/items', user_controller.get_items);

module.exports = router;