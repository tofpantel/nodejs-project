const mongoose = require('mongoose')
// it's needed for the unique fields, say email
// username which have to be unique in the DB

const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email);
    }

let adressSchema  = new Schema({
    area: { type: String},
    road: { type: String}
}, { _id: false })

let phoneSchema = new Schema({
    type: { type: String },
    number: { type: String }
}, { _id: false })

let productSchema = new Schema({
    product: {type: String },
    cost: { type: Number },
    quantity: { type: Number },
    date: { type: Date, default: Date.now } 
})


let userSchema = new Schema({
    username: {
        type: String,
        // what to return if the username value isn't
        // included
        required: [true, 'Username is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required field'],
        max: 100
    },
    name: {
        type: String,
        max: 100
    },
    surname: {
        type: String,
        max: 100
    },
    email: {
        type: String,
        required: [true,  'Email is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true,
        // validate: [validateEmail, 'Email address is not valid']
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email address is not valid'
        ]
    },
    // address is a subdocument
    address: adressSchema,

    // phone is an array of subdocuments
    phone: { type: [phoneSchema], null: true },
    products: { type: [productSchema], null: true}   
}, {
    collection: 'users',
    timestamps: true
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('user', userSchema)

