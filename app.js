express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const path = require("path")
const expressSession = require("express-session")
const flash = require("connect-flash")

require("dotenv").config()  

const ownersRoutter = require("./routes/ownersRoutter")
const productsRoutter = require("./routes/productsRoutter")
const usersRoutter = require("./routes/usersRoutter")
const index = require("./routes/index")

const db = require("./config/mongoose-connection")

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(
    expressSession({
        resave : false,
        saveUninitialized : false,
        secret : process.env.EXPRESS_SESSION_SECRET
    })
)
app.use(flash())
app.use(express.static(path.join(__dirname , "public")))
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next()
})

app.use("/" , index)
app.use("/owners", ownersRoutter);
app.use("/users", usersRoutter);
app.use("/products", productsRoutter);


app.listen( process.env.PORT || 3000,()=>{
    console.log("server start")
})