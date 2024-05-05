const express =require('express')
const router=express.Router()
const genres=require('../api_controller/geresController')
const verifyRoles = require('../middlewares/verifyRoles')
const ROLES_LIST=require('../config/roles_list')

router.route('/').post(verifyRoles(ROLES_LIST.Admin),genres.addGenres).get(genres.getAllGenres)
router.route('/:id').delete(verifyRoles(ROLES_LIST.Admin),genres.deleteGenres)
    module.exports=router