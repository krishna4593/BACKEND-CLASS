//server start :
require("dotenv").config()
const app = require("./src/app")
const connectToDb = require("./src/config/database")

connectToDb()



app.listen(3000,()=>{
    console.log("server started at port no. 3000")
})