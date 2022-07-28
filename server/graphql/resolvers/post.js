const { AuthenticationError, UserInputError } = require("apollo-server-express")
const Post = require("../../model/Post")
const User = require("../../model/User")
const checkAuth = require('../../utils/auth')
const slugify = require('slugify')
const { PubSub } =require('graphql-subscriptions') ;
const moment = require('moment'); 

const pubsub = new PubSub();
module.exports = {
    Query: { 
        getPosts: async () => {
            const post = await Post.find().sort({"createdAt":-1})
            // const post = await User.deleteMany()
            return post
        },
        deletePost:async()=>{
           const post = await Post.deleteMany()
           return 'deleted'     
        },
        getPost: async (_, { id }) => {
            const post = await Post.findById(id)
            return post
        },
    },
    Mutation: {
        userPosts: async (_, { id }) => {
            const userPost = await Post.find({ user: { $elemMatch: { $eq: id } } })
            return userPost
        },
        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context);
      
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
              await post.save();
              return post;
            } else throw new UserInputError('Post not found');
          }
        },
        createPost: async (_, { body, title, coverPhoto }, context) => {
            const { username } = checkAuth(context)
            const userr = User.findOne({ username: username })
            if (!username) {
                throw new AuthenticationError('You are not Authenticated')
            }
            if(!userr) throw new Error('User not found')
            const slug = slugify(title)
             console.log(slug)
            const newPost  = new Post({
                body,
                slug,
                title,
                createdAt:new Date().toISOString(),
                username: username,
                coverPhoto,
            })  
            if(!newPost) throw new Error('Post not found')      
            const post = await newPost.save()
            console.log(post);
            const result = await User.findOneAndUpdate({username},{$push:{post}})
            console.log(result)
          return post
        },
        createComment: async (_, { postid, body }, context) => {
            const { username } = checkAuth(context) 
            const comment = {
                username, body, createdAt: new Date().toDateString()
            }
            if (body.trim() === '') {
                throw new UserInputError('Body Must not be empty')
            }
            const post = await Post.findByIdAndUpdate(postid, { $push: { comments: comment } })
            console.log(post)
            return post
        },
        deletePost: async (_, { postid }, context) => {

            const { username, id } = checkAuth(context)

            const posts = await Post.findById(postid)

            if(posts.username == username){
                const user =  await User.findOneAndUpdate({username},{$pull:{post:postid}})

                const result = await user.save()
    
                await Post.findByIdAndRemove(postid)
            }
            console.log(posts.username)

            return "Successfully Deleted"
        },
        deleteComment: async (_, { postId, commentId }, context) => {
            const { username } = checkAuth(context)

            const post = await Post.findById(postId)
            if (post) {
                const commentIndex = post.comments.findIndex(c => c.id === commentId)
                if (post.comments[commentIndex].username === username){
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } else {
                throw new UserInputError('Post Not Found')
            }
        },
        findPost :async(_,{username,slug})=>{
             const post = await Post.findOne({username},{slug:{$elemMatch:{slug}}})
            //  const post = await Post.findOne({slug})
             return post
        },
        deleteUsers:async()=>{
             await User.deleteMany()
             return 'All Users Deleted Successfully'   
        } , 
        SinglePost:async(_,{id})=>{
            const post = await Post.findById(id)
            return post  
        },
        // Subscription: {
        //     newPost: {
        //       subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        //     }
        //   }
    }
