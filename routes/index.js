const express = require("express")
const router = express.Router()
const isloggedin = require("../middelwares/isloggedin")
const productModel = require("../models/product-models")
const userModels = require("../models/user-models")
const { number } = require("joi")

router.get("/" , function(req,res){
    let error = req.flash("error");
    let success = req.flash("success")
    res.render("index" , {error , success})
})

router.get("/shop" ,isloggedin, async function (req, res){
     let product = await productModel.find()
     res.render("shop" , {product , loggedin : false })
})

router.get("/cart" ,isloggedin, async function (req, res){
  let user = await userModels.findOne({email : req.user.email}).populate('cart')
    let bill = user.cart[0].price + 20
     res.render("cart" ,{user , bill})
})
router.get("/delet" , async function(req, res ){
  let productdetail = await productModel.deleteMany()
  res.send(productdetail)
})

router.get("/alldata" , async function(req, res ){
  let productdata = await productModel.find({} , {image : 0 , })
  res.json(productdata)
})

router.get("/addtocart/:productid", isloggedin , async function(req, res ){
  let user = await userModels.findOne({email : req.user.email})
  user.cart.push(req.params.productid);
  await user.save()
  req.flash("success" , "Added to cart")
  res.redirect("/shop")
})

module.exports = router