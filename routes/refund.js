const express = require('express');
const router = express.Router();
const orderController=require('../api_controller/orders')
const ROLES_LIST=require('../config/roles_list')
const verifyRoles=require('../middlewares/verifyRoles')

router.route('/:id').put(verifyRoles(ROLES_LIST.Admin),orderController.makeRefund)

module.exports = router;
