const express = require("express")
const router = express.Router();
const isloggedin = require("../middelwares/isloggedin")
const upload = require("../config/multer-config");
const productModels = require("../models/product-models");

router.post("/create", upload.single("image"), async function (req, res) {

    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body

        let product = await productModels.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        })
        req.flash("success" , "product is created ")
        res.redirect("/owners/admin")
    } catch (err) {
        res.send(err.message)
    }

})

module.exports = router