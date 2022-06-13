const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const auth = require('../middlewares/auth')
const Post = require('../model/Post')

router.post('/',asyncHandler(async(req,res)=>{
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
        res.json(post)
    } catch (error){
        throw new Error(error)
    }
    
}))

module.exports = router

