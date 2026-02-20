const userModel = require("../modules/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function registerController (req,res){
    const {email, username, password, bio, profileImage}= req.body

    const userAlreadyExist= await userModel.findOne({
        $or:[
            {email:email},
            {username:username}
        ]
    })
    if(userAlreadyExist){
        return res.status(409).json({
            message:"user already exist "
        })
    }

    const hash =await bcrypt.hash(password, 10)

    const user =await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    })

    const token = jwt.sign({
        id:user._id,
        username: user.username
    },
   process.env.JWT_SECRET,
   {expiresIn:"1d"}
)
res.cookie("token",token)

res.status(201).json({
    message:"user registered sucesfully",
    user:{
                _id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage 
    }
  
})
}

async function loginController (req,res){
    const {email, username, password}= req.body

    const user= await userModel.findOne({
        $or:[
            {email:email},
            {username:username}
        ]
    })
    if(!user){
        return res.status(404).json({
            message:"user does not exist "
        })
    }
   const passwordMatch = await bcrypt.compare(
            password,
            user.password
        )

        if(!passwordMatch){
            return res.status(401).json({
                message:"invalid password"
            })
        }
   
    const token = jwt.sign({
        id:user._id,
        username: user.username
    },
   process.env.JWT_SECRET,
   {expiresIn:"1d"}
)
res.cookie("token",token)

res.status(200).json({
    message:"user logged in sucesfully",
    username: user.username,
    email:user.email,
    bio:user.bio,
    profileImage: user.profileImage
  
})
}




module.exports= {
    registerController, 
    loginController
}


