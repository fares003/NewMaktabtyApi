const express = require('express');
const router = express.Router();
const logoutControl=require('../api_controller/logout')

router.get('/',logoutControl.handleLogout)

module.exports=router