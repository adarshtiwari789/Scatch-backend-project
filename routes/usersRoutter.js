const express = require("express")
const router = express.Router();
const {userRegister , loginUser , logout} = require("../controllers/authReg") 

router.get("/", function (req, res) {
    res.send("hey you are on userroute")
})
router.post("/register", userRegister)
router.post("/login", loginUser)
router.get("/logout" , logout)
module.exports = router