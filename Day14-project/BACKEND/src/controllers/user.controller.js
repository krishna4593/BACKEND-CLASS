const followModel=require("../modules/follow.model")

async function followUserController(req,res){
    followerUsername=req.user.username
    followeeUsername= req.params.username

    if(followerUsername==followeeUsername){
        return res.status(400).json({
            message:"you cannot follow yourself"
        })
    }
    
    const followeeExists= await followModel.findOne({
        followee: followeeUsername
    })
    
    if(!followeeExists){
        return res.status(404).json({
            message:"Account doesnot exist which you want to follow"
        })
    }

    alreadyFollowing= await followModel.findOne({
       follower:followerUsername,
       followee:followeeUsername
    })

    if(alreadyFollowing){
        return res.status(200).json({
            message:`you are already following ${followeeUsername}`
        }) 
    }

    const followRecord = await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
    })

    res.status(201).json({
        message:`you have started following ${followeeUsername}`,
        followRecord
    })

}


async function unfollowUserController(req,res){
    const followerUsername= req.user.username
    const followeeUsername= req.params.username

    const isUserFollowing = await followModel.findOne({
      follower:followerUsername,
      followee:followeeUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message:`you are not following ${followeeUsername}`
        })
    }
   await followModel.findByIdAndDelete(isUserFollowing._id)

   res.status(200).json({
    message:`you have unfollowed ${followeeUsername}`
   })

}

module.exports = {
    followUserController,
    unfollowUserController
}