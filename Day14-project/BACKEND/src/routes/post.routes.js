const express= require("express")
const postController= require("../controllers/post.controller")
const multer = require("multer")
const upload =multer({storage:multer.memoryStorage()})
const identifyUser= require("../middlewares/auth.middleware")
const postRouter= express.Router()

postRouter.post("/",identifyUser,upload.single("image") ,postController.createPostController)

postRouter.get("/",identifyUser, postController.getPostController)

postRouter.get("/details/:postid",identifyUser, postController.getPostDetails)

postRouter.post("/like/:postId", identifyUser, postController.likeController)

module.exports= postRouter