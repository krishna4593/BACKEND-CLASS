const postModel= require("../modules/post.model")
const ImageKit = require ("@imagekit/nodejs")
const likeModel= require("../modules/like.model")
const {toFile}= require ("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imageKit = new ImageKit({
    privateKey: process.env.PRIVATE_KEY
}
)

async function createPostController(req,res){
console.log(req.body, req.file)

 const userId=req.user.id

const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: "Test",
    folder:"cohort-2-insta"
})
const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user:decoded.id
})

res.status(201).json({
    message:"post created sucessfully",
    post
})
}


async function getPostController(req,res){
    

  const userId=req.user.id

  const posts = await postModel.find({
    user:userId
  })

  res.status(200).json({
    message:"posts fetched sucessfully",
    posts
  })
}



async function getPostDetails(req,res){
   
  const userId= req.user.id
  const postId= req.params.postId

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
        message:"post not found"
    })
  }

  const isValidUser= post.user.toString()=== userId

  if(!isValidUser){
    return res.status(403).json({
        message:"Forbidden content"
    })
  }

  return res.status(200).json({
 message:"post fetched sucessfully",
 post
  })
}

async function likeController(req,res){
  const user= req.user.username
  const postId= req.params.postId

 const post= await postModel.findById(postId)
 if(!post){
    return res.status(404).json({
        message:"post not found "
    })
 }

 const like= await likeModel.create({
    username:user,
    postid: postId
 })

 res.status(201).json({
    message:" post liked suceessfully",
    like
 })
}

module.exports = {
             createPostController,
             getPostController,
             getPostDetails,
             likeController
   }