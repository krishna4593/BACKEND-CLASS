const mongoose= require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:true
    },
    imgUrl:{
        type:String,
        required:true,
        
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const postModel= mongoose.model("posts", postSchema)

module.exports = postModel