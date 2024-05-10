const  express =require('express')
const router=express.Router() 
const booksController = require('../api_controller/books');

router.route('/').put(booksController.updateCount)

module.exports=router