const mongoose = require('mongoose')
// it's needed for the unique fields, say product
// description which have to be unique in the DB

const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

// const validateEmail = (email) => {
//     const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//     return re.test(email);
//     }



let productSchema = new Schema({
    product: {type: String },
    cost: { type: Number },
    description: {String},
    quantity: { type: Number }
}, {
    collection: 'products',
    timestamps: true
})

productSchema.plugin(uniqueValidator)

module.exports = mongoose.model('product', productSchema)

