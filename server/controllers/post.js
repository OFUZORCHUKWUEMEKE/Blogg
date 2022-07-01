const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const auth = require('../middlewares/auth')
const Post = require('../model/Post')
const User = require('../model/User')

router.post('/createpost', asyncHandler(async (req, res) => {
    const { body, title, coverPhoto } = req.body
    const { id, email, username } = req.user
    const slug = slugify(title)
    try {
        const post = await Post.create({
            body,
            title, coverPhoto,
            username,
            slug,
            createdAt: new Date().toISOString()
        })
        const result = await User.findOneAndUpdate({ username }, { $push: { post } })
        res.json(post)
    } catch (error) {
        throw new Error(error)
    }

}))

router.get('/like', asyncHandler(async (req, res) => {
    const { id, user, username } = req.user
    const { postId } = req.query
    const post = await Post.findById(postId);
    if (post) {
        if (post.likes.find((like) => like.username === username)) {
            // Post already likes, unlike it
            post.likes = post.likes.filter((like) => like.username !== username);
        } else {
            // Not liked, like post
            post.likes.push({
                username,
                createdAt: new Date().toISOString()
            });
        }
        const newPost = await post.save();
        return res.status(200).json(newPost);
    } else throw new Error('Post not found');
}))


router.get("/follow", async (req, res) => {
    const { id, user, username } = req.user
    if (id !== req.query.id){
        try {
            const user = await User.findById(req.query.id);
            const currentUser = await User.findById(id);
            if (user.followers.find(follower => follower.username === username)) {
                user.followers = user.followers.filter(follower => follower.username !== username)
                currentUser.following = currentUser.following.filter(follow => follow.username !== username)
                await user.save()
                await currentUser.save()
                res.status(200).json(user);
            } else {
                user.followers.push({
                    username,
                    createdAt: Date.now().toLocaleString()
                })
                currentUser.following.push({
                    username: user.username,
                    createdAt: Date.now().toLocaleString()
                })
                await user.save()
                await currentUser.save()
                res.status(200).json(user);
            }
        } catch (err) {  
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant follow yourself");
    }
})

router.get('/findpost', asyncHandler(async (req, res) => {
    const post = await Post.findById(req.query.id)
    return res.status(200).json(post)
}))

router.get('/getpost', asyncHandler(async (req, res) => {
    const post = await Post.find()
    return res.status(200).json(post)
}))

module.exports = router




module.exports = router

