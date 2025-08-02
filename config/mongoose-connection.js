const mongoose = require("mongoose")
const config = require("config")
const dbgr = require("debug")("development:mongoose")

mongoose.connect(`${process.env.URI}/scatch`)
.then(function () {
    console.log("connected")
})
.catch(function(err){
 dbgr("not connected")
})

module.exports = mongoose.connection;