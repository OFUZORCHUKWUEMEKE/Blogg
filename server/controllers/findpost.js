const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const auth = require('../middlewares/auth')
const Post = require('../model/Post')
const mongoose = require('mongoose')
const User = require('../model/User')


router.get('/findpost',asyncHandler(async(req,res)=>{
    const post = await Post.findById(req.query.id)
   return res.status(200).json(post)
}))  

router.get('/username', asyncHandler(async (req, res) => { 
    const { username } = req.query
    const user = await User.findOne({ username }).populate('post')
    res.status(200).json(user)
}))

module.exports = router 