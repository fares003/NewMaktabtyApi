const express = require('express');
const router = express.Router();
const booksController = require('../api_controller/books');
const ROLES_LIST=require('../config/roles_list')
const verifyRoles=require('../middlewares/verifyRoles')

router.route('/')
    .get(booksController.getAllBooks)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),booksController.createNewBooks)
    
    

router.route('/:id')
    .get(booksController.getBooks)
    .delete(verifyRoles(ROLES_LIST.Admin),booksController.deleteBooks)
    .put(verifyRoles(ROLES_LIST.Admin),booksController.updateBooks);

router.route('/:id/reviews').post(booksController.addReview)
module.exports = router;