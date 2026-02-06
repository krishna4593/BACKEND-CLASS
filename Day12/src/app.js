const express=require("express")
const cookieParser =require("cookie-parser")
const app = express()
const userModel = require("./modules/user.model")
const authRouter= require("./routes/auth.routes")

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)



module.exports = app