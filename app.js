const express = require("express")
const app = express()

const cookieParser = require("cookie-parser")
const path = require("path")
const ownersRoutter = require("./routes/ownersRoutter")
const usersRoutter = require("./routes/usersRoutter")
const productsRoutter = require("./routes/productsRoutter")
const db = require("./config/mongoose-connection")

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname , "public")))
app.set('view engine', 'ejs');
 
app.use("/owners", ownersRoutter);
app.use("/users", usersRoutter);
app.use("/products", productsRoutter);


app.listen(3000,()=>{
    console.log("server start")
})