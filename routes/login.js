const express = require('express');
const router = express.Router();
const loginControl=require('../api_controller/login')

router.post('/',loginControl.handleLogin)

module.exports=router