
const User = require('../models/user.model')

exports.findOne = function(req, res){
    const username = req.params.username

    User.findOne({ username:username }, {_id:0, username:1, products:1}, (err, result)=>{
        if(err){
        res.json({ status: false, data: err })
     }else {
        res.json({ status: true, data: result})
    }
    })
}

exports.create = function (req, res){
    const username = req.body.username
    const product = req.body.product

    User.updateOne( { username: username },
        {
            $push: {
                product: product
            }
        },  (err, result)=>{
            if(err){
            res.json({ status: false, data: err })
         }else {
            res.json({ status: true, data: result})
        }
        })

}


exports.update = function (req, res) {

    const username = req.body.username;
    const product_id = req.body.product._id;
    const product_quantity = req.body.product.quantity;
  
    console.log("Update product for username:", username);
  
    User.updateOne(
      { username: username, "products._id": product_id  }, 
      {
        $set: {
          "products.$.quantity": product_quantity
        }
      },
      (err, result) => {
        if (err) {
          res.json({ status: false, data: err });
        } else {
          res.json({ status: true, data: result });
        }
      });
  };

exports.delete =function(req, res) {
    const username= req.params.username
    const product = req.params.product

    User.updateOne(
        { username: username},
        {
            $pull:{
                products: { product: product }
            }
        },  (err, result)=>{
            if(err){
            res.json({ status: false, data: err })
         }else {
            res.json({ status: true, data: result})
        }
        })
    }

    exports.stats1 = function (req, res) {

        console.log("For all users sum by product and count");
      
        User.aggregate([
          {
            $unwind: "$products" 
          },
          {
            $project: {
              id: 1,
              username:1,
              products:1
            }
          },
          {
              $group: {
              _id: { 
                username: "$username", 
                product: "$products.product" },
              totalAmount: { 
                $sum: { 
                  $multiply: [ "$products.cost", "$products.quantity" ] 
                } 
              },
              count: { $sum: 1 }
            }
          },
          {
            $sort:{ "_id.username" : 1, "_id.product" : 1 }
          },
        ],
        (err, result) => {
          if (err) {
            res.json({ status: false, data: err });
          } else {
            res.json({ status: true, data: result });
          }
        });
      };
      
      exports.stats2 = function (req, res) {
      
        const username = req.params.username;
       
        console.log("For user sum by product and count", username);
      
        User.aggregate([
          {
            $match:  { 
              username: username  
            } 
          },
          {
            $unwind: "$products" 
          },
          {
            $project: {
              id: 1,
              username:1,
              products:1
            }
          },
          {
              $group: {
              _id: { 
                username: "$username", 
                product: "$products.product" },
              totalAmount: { 
                $sum: { 
                  $multiply: [ "$products.cost", "$products.quantity" ] 
                } 
              },
              count: { $sum: 1 }
            }
          },
          {
            $sort:{ "_id.username" : 1, "_id.product" : 1 }
          },
        ],
        (err, result) => {
          if (err) {
            res.json({ status: false, data: err });
          } else {
            res.json({ status: true, data: result });
          }
        });
      };