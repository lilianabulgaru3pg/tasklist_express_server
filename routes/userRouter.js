var express = require('express');
var router = express.Router();


var user_controller = require('../controllers/userController');

router.post('/tasks', user_controller.user_tasks);
router.post('/tasks/add-task', user_controller.create_task);
router.get('/tasks', user_controller.user_authrequired);
router.get('/tasks/search', user_controller.item_search);
router.get('/tasks/:taskId', user_controller.user_taskId);
router.get('/tasks/:taskId/items', user_controller.get_items);
router.post('/tasks/:taskId/add-item', user_controller.create_item);
router.put('/tasks/:itemId/', user_controller.update_item);
router.get('/logout', user_controller.user_logout);


module.exports = router;