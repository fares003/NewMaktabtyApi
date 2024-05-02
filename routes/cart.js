const express =require('express')
const cart = require('../api_controller/cart')
const router=express.Router()

router.route('/:id').post(cart.addInCart).get(cart.getCart).delete(cart.deleteAllCart)
router.route('/:userId/:bookId').delete(cart.deleteCartElement)
    module.exports=router