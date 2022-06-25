const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const User = require('../model/User')

// router.get('/follow',asyncHandler(async (req, res) => {
//     const { id, email } = req.user
//     const { ide,username} = req.query  
//     if (req.user.id === req.query.ide) {
//         return res.status(400).json({ alreadyfollow : "You cannot follow yourself"})
//     } 

//     let user = await User.findOne({username},{followers:{ $elemMatch:{$eq:id}}}).select('followers')
//     console.log(user?.followers)
    // if(user?.followers.length){
    //     const user = await User.findOneAndUpdate({username},{$pop:{followers:id}}) 
    //     return res.status(200).json(user)
    // }
    // else{
    //     const user = await User.findOneAndUpdate({username},{$push:{followers:id}}) 
    //     return res.status(200).json(user)
    // }
  
// }))

router.get('/follow',asyncHandler(async (req, res) => {
    // console.log(req.user)
    const {username} = req.user
    
    const name = req.query.username
    await User.findOne({username}).then(async(user)=>{
          const follow = user.followers.find(u=>u===name)
          console.log(follow)
          if(follow){
              const use = user.followers.shift(name)
              console.log(use)
              await user.save()
              return res.status(200).json({message:'removed',data:user})    
          }
        //   else{
        //       user.followers.push(name)
        //       await user.save()
        //       return res.status(200).json({message:'added',data:user})
        //   }
    })
}))


module.exports = router