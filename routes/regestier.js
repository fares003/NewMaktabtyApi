// In your routes file
const express = require('express');
const router = express.Router();
const regControl = require('../api_controller/regestier');
const upload = require('../middlewares/multers.js'); // Ensure this path is correct

// Apply the upload middleware to the route that handles registration
router.post('/', upload.single('image'), regControl.handleReg);

module.exports = router;
