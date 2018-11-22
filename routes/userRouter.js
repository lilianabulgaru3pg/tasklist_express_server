var express = require('express');
var router = express.Router();


var user_controller = require('../controllers/userController');

router.post('/user-tasks', user_controller.user_tasks);
router.post('/user-tasks/add-task', user_controller.create_task);
router.get('/user-tasks', user_controller.user_authrequired);
router.get('/user-tasks/:taskId', user_controller.user_taskId);
router.get('/user-tasks/:taskId/items', user_controller.get_items);
router.post('/user-tasks/:taskId/add-item', user_controller.create_item);
router.put('/user-tasks/:itemId/update', user_controller.update_item);
router.get('/logout', user_controller.user_logout);

module.exports = router;