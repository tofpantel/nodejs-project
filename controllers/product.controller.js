// inherit all the properties if user.model
const Product = require('../models/product.model')


exports.findAll = function(req, res){
    console.log("Find all products")

// if User.find returns error, assign it to the err, 
//otherwise the search results are assigned to the results

Product.find({}, (err, results) => {
        if (err){
            res.status(400).json({ status: false, data: err})
            console.log('Problem in reading products', err)
        } else {
            // send a respond with a json containing status and data
            res.status(200).json({ status: true, data: results})
            console.log('Success in reading products')
            }
    });
};


exports.findOne = function(req, res){

    const product = req.params.product


    console.log("Find user with product name", product)

    Product.findOne({ product: product }, (err, results) => {
        if (err) {
            res.status(400).json({ status: false, data: err})
            console.log(`Problem in finding product with  name ${product}`, err)
        } else {
            res.status(200).json({ status: true, data: results})
            console.log('Success in finding product', product)
        }
    })
}

/**
 * CREATE
 */

exports.create = function (req, res) {
    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    })
    console.log("Insert product with name ", req.body.product)

    newProduct.save((err, result) => {
        if (err) {
            res.status(400).json({ status: false, data: err})
            console.log(`Problem in creating product`, err)
        } else {
            res.status(200).json({ status: true, data: result})
            console.log('Success in creating product')
        }
        
    })
}

