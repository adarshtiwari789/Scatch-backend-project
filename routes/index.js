const express = require("express")
const router = express.Router()
const isloggedin = require("../middelwares/isloggedin")
const productModel = require("../models/product-models")

router.get("/" , function(req,res){
    let error = req.flash("error");
    let success = req.flash("success")
    res.render("index" , {error , success})
})

router.get("/shop" ,isloggedin, async function (req, res){
     let product = await productModel.find()
     res.render("shop" , {product})
})
router.get("/delet" , async function(req, res ){
  let productdetail = await productModel.deleteMany()
  res.send(productdetail)
})

router.get("/alldata" , async function(req, res ){
  let productdata = await productModel.find({} , {image : 0 , })
  res.json(productdata)
})
module.exports = router