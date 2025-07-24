const usermodel = require("../models/user-models")
const bcrypt = require("bcrypt");
const { gnerateToken } = require("../utils/generateToken")


module.exports.userRegister = async function (req, res) {
    try {
        let { email, password, fullname } = req.body

        let user = await usermodel.findOne({ email })
        if (user) {
            req.flash("error", "user already register")
            res.redirect("/")
        }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await usermodel.create({
                        email,
                        password: hash,
                        fullname
                    })
                    let token = gnerateToken(user)
                    res.cookie("token", token)
                    req.flash("success" , " User created ")
                    res.redirect("/")
                }
            });
        })

    } catch (err) {
        res.send(err.message)
    }

}
module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body

    let user = await usermodel.findOne({ email: email })
if (!user){
    req.flash("error" , "Something is wrong ")
    res.redirect("/")
}

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = gnerateToken(user)
            res.cookie("token", token)
            req.flash("success" , "added to cart")
            res.redirect("/shop")
        }
        else {
            req.flash("error" , "Password or username is incorrect")
            res.redirect("/")
        }
    })
}

module.exports.logout = function (req, res) {
    res.cookie("token")
    res.redirect("/")
}