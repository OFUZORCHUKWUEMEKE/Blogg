const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const auth = require('../middlewares/auth')
const Post = require('../model/Post')
const User = require('../model/User')

router.post('/createpost',asyncHandler(async(req,res)=>{
    const {body,title,coverPhoto} = req.body
    const {id,email,username} = req.user
    const slug = slugify(title)
    try {
        const post = await Post.create({
            body,
            title,coverPhoto,
            username,
            slug,
            createdAt:new Date().toISOString()
        })
        const result = await User.findOneAndUpdate({username},{$push:{post}})
        res.json(post)
    } catch (error) {
        throw new Error(error)  
    }
    
}))


router.get('/findpost',asyncHandler(async(req,res)=>{
    const post = await Post.findById(req.query.id)
   return res.status(200).json(post)
}))  

module.exports = router 




module.exports = router

