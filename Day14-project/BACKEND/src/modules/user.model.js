const mongoose= require("mongoose")


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
         type:String,
        required:true,
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/qjtudnywn/instagram-default-user-profile-pic-flip-flops-v0-g983oflfeg4d1.webp?updatedAt=1770785007658"
    }

})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel