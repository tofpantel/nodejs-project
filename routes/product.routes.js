const express = require('express')
const routerP = express.Router();
const productController = require("../controllers/product.controller")

// a call for the path findAll, send it to a controller which contains the logic 
// connecting with the db and make CRUD actions
routerP.get('/findAll', productController.findAll)
// :username is a path parameter. I
routerP.get('/findOne/:product', productController.findOne)



/**
 * CREATE
 */
 routerP.post('/create', productController.create)



module.exports = routerP;