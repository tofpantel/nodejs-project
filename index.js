const express = require('express')
const app = express()
const port = 3000

const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const mongoose = require('mongoose')
require("dotenv").config()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger')

app.use('/', express.static('files'))

mongoose.set('strictQuery', false)

mongoose.connect(
    // pass the connection string
    process.env.MONGODB_URI,
    // these are options required from mongoose to get connected to Atlas
    { useNewUrlParser: true, useUnifiedTopology: true},
    // callback funbction follows
    (err) => {
        if(err){
            console.log(err)
        }else{
            console.log("Connected to MongoDB")
        }
    }
)

//if path is /api/user' make a  call user file and
// send it to the corresponding folder handling the routes of user


//index ===> routes ====> controller for user
const user = require("./routes/user.routes")
app.use('/api/user', user)

//index ===> routes ====> controller for product
const product = require("./routes/product.routes")
app.use('/api/product', product)


const userProduct = require("./routes/user.product.routes")
app.use('/api/userproducts', userProduct)

app.use('/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerDocument.options)
)

app.listen(port, ()=> {
    console.log(`Server is listening in port ${port}`)
})