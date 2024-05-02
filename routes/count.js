const  express =require('express')
const router=express.Router() 
const booksController = require('../api_controller/books');

router.route('/:id').put(booksController.updateCount)

module.exports=router