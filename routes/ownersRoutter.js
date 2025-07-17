const express = require("express")
const router = express.Router();
const ownersModel = require("../models/owners-models")


if (process.env.NODE_ENV = "development") {
    router.post("/create", async function (req, res) {
        
        let { fullname, email, password, gstin } = req.body
        
        let owner = await ownersModel.find()
        if (owner.length > 0) {
            return res
            .status(502)
            .send("you have a owner ")
        }
     const createOwner = await ownersModel.create({
            fullname,
            email,
            password,
        })
        res.send(createOwner)
    })
}

    router.get("/admin" , function (req , res) {
    let success = req.flash("success")
    res.render("createproducts" , {success})
})

module.exports = router