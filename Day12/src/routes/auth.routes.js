const  userModel = require("../modules/user.model")
const express = require("express")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const authRouter= express.Router()

authRouter.post("/register", async (req,res)=>{
    const {name, email, password}= req.body

    const userAlreadyExist = await userModel.findOne({email})
    if(userAlreadyExist){
        return res.status(400).json({
            messsage:"Email already registered.."

        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")
    const users =await userModel.create({
        name, email, password: hash
    })

    const token = jwt.sign({
        id: users._id
    }, 
    process.env.JWT_SECRET
)
  res.cookie("jwt_token", token)
 
  res.status(201).json({
    message:"user registered sucessfully",
    users,
    token

  })

})


authRouter.post("/login",async (req,res)=>{
    const {email, password}= req.body
    const user = await userModel.findOne({email})
    if(!user){
     return   res.status(404).json({
            message:"user not found"
        })

    }

    const IsPasswordMatched= user.password===crypto.createHash("md5").update(password).digest("hex")
    if(!IsPasswordMatched){
        return res.status(401).json({
            message:"Incorrect Password"
        })
    }

    const token = jwt.sign({
        id:user._id
    }, 
   process.env.JWT_SECRET
)
 
  res.cookie("jwt_token", token)

  res.status(200).json({
    message:"logged in sucessfully",
    user,
    token
  })

})

module.exports = authRouter
