const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const User = require('../model/User')


router.put("/follow", async (req, res) =>{
    if (req.user.username !== req.query.username){
      try {
        const  currentUser = await User.findOne({username:req.user.username});
        const user = await User.findOne({username:req.query.username});
        if (!user.followers.includes(req.user.username)) {
          await user.updateOne({ $push: { followers: req.user.username} });
          await currentUser.updateOne({ $push: { followings: req.query.username } });  
          await user.save()
          res.status(200).json({msg:"user has been followed",user:user}); 
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else{
      res.status(403).json("you cant follow yourself");
    }
  });

  router.put("/unfollow", async (req, res) => {
    if (req.user.username !== req.query.username) {
      try {
        const  currentUser = await User.findOne({username:req.user.username});
        const user = await User.findOne({username:req.query.username});
        if (user.followers.includes(req.user.username)) {
          await user.updateOne({ $pull: { followers: req.user.username } });
          await currentUser.updateOne({ $pull: { followings: req.user.username } });
          
          res.status(200).json({msg:"user has been unfollowed",user:user}); 
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }  
  });


module.exports = router