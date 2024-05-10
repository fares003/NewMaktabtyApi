const express = require('express');
const router = express.Router();
const user = require('../api_controller/usersController');

router.route('/:id').get(user.getUserInfo).put(user.updateUserInfo);

module.exports = router;
