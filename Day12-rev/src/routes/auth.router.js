const express= require("express")
const userModel= require("../modules/users.model")
const jwt = require("jsonwebtoken")

const authRouter= express.Router()


authRouter.post("/register",(req,res)=>{
    const {name, email , password}= req.body

    const userAlreadyExist= userModel.findOne({email})
    if(userAlreadyExist){
        return res.status(409).json({
         message:"Email already registered"
        })
    }
    const user=  userModel.create({
        name, email, password
    })

    const token= jwt.sign({
        id: user._id
    },
    process.env.JWT_SECRET
)
  
 res.cookie("jwt_token",token)

 res.status(201).json({
    message:"user registered sucessfully",
    user,
    token
 })


})

authRouter.post("/login", (req,res)=>{
    const {email,password}=req.body
  
     const userExist= userModel.findOne({email})
     if(!userExist){
        return res.status(404).json({
            message:"user not found"
        })
     }
     const checkPassword= user.password=== password
     if(!checkPassword){
        return res.status(401).json({
            message:"password not matched"
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
     



module.exports= authRouter