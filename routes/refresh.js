const express = require('express');
const router = express.Router();
const refreshTokenController = require('../api_controller/refresh_token_controller');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;