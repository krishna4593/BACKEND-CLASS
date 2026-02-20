const express = require("express")
const userController= require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter=express.Router()

userRouter.post("/follow/:userrname", identifyUser, userController.followUserController)
userRouter.post("/unfollow/:userrname", identifyUser, userController.unfollowUserController)

module.exports = userRouter 