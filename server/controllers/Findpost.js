const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const auth = require('../middlewares/auth')
const Post = require('../model/Post')
const mongoose = require('mongoose')


router.get('/findpost',asyncHandler(async(req,res)=>{
    const post = await Post.findById(req.query.id)
   return res.status(200).json(post)
}))  

module.exports = router 

