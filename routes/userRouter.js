var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

router.post('/user-tasks', user_controller.user_tasks);
router.get('/authrequired/user-tasks', user_controller.user_authrequired);

module.exports = router;