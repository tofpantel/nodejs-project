const express = require('express')
const router = express.Router();
const userController = require("../controllers/user.controller")
// a call for the path findAll, send it to a controller which contains the logic 
// connecting with the db and make CRUD actions
router.get('/findAll', userController.findAll)
// :username is a path parameter. I
router.get('/findOne/:username', userController.findOne)
   
/**
 * CREATE
 */
router.post('/create', userController.create)
router.patch('/update', userController.update)
router.delete('/delete/:username', userController.delete)

module.exports = router;