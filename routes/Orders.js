const express = require('express');
const router = express.Router();
const orderController=require('../api_controller/orders')
const ROLES_LIST=require('../config/roles_list')
const verifyRoles=require('../middlewares/verifyRoles')

router.route('/').post(orderController.addOrder).get(verifyRoles(ROLES_LIST.Admin),orderController.getAllOrders)
router.route('/:id').delete(verifyRoles(ROLES_LIST.Admin),orderController.deleteOrder).put(verifyRoles(ROLES_LIST.Admin),orderController.setState)

module.exports = router;
