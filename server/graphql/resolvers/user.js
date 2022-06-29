const Post = require("../../model/Post")
const User = require("../../model/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { hashPass, Encode, comparepass } = require("../../utils/functions")
const { ApolloError, AuthenticationError, UserInputError } = require("apollo-server-express")
const { SECRET_KEY } = require("../../utils/config")
const checkAuth = require('../../utils/auth')

function generateToken (user){
    return  jwt.sign({
          id:user.id,
          email:user.email,
          username:user.username
      },SECRET_KEY,{expiresIn:'365d'})
  }

module.exports = {
    Query: {
        getUsers : async()=>{
            const Users = await User.deleteMany()
            console.log(Users)  
            return "successfully deleted"
            
        },
        getUser:async(_,{username})=>{
            const Users = await User.findOne({username})
            return Users 
        }
    },
    Mutation: {
        register: async (_, { username, email, password, confirmPassword } ) => {
            const userAlready = await User.findOne({ username })

            if (userAlready) {
              throw new UserInputError('User already Taken')
            }
            
            if(password.length < 6){
                throw new UserInputError('Password is too short')
            }
            const hashed = await hashPass(password)
            const user = new User({
                username,
                email,
                password: hashed,
            })
            await user.save()
            
            const token = await generateToken(user)
         
            await user.save()

            return {  
                username: user.username,
                email: user.email,
                id: user._id,
                token,
                post: user.post

            }
        },
        login: async (_, { email, password }) => {
                const user = await User.findOne({ email }) 
                if(!user){
                  throw new UserInputError("Invalid Credentials")
                }
                const validate = await comparepass(password, user.password)

                if(!validate){
                    throw new Error('Invalid Username/Password')
                }
                const token = await generateToken(user)
                       user.token = token
                        await user.save()
                        return {
                            username: user.username,
                            email: user.email, 
                            id: user._id,
                            token: user.token,
                }                
        },
        findUser:async(_,{username})=>{
            const user = await User.findOne({username})
            const {post} = await User.findOne({username}).select('post')
            let arr = []
            console.log(post)
            await post.forEach(async(p)=>{
               const postt = await Post.findById(p)
               
               arr.push(postt)
               console.log(arr)
            })
                return {
                            username: user.username,
                            email: user.email, 
                            id: user._id,
                            token: user.token,
                            post:arr,
                            followers:user.followers
                   }
        },
        deleteUser:async(_,{username})=>{
            const user = await User.deleteOne({username})
            return 'Successfully Deleted'     
        },
        followUser:async(_,{userId,user},context)=>{
               const {username} = checkAuth(context)
               const userr = await User.findById(user)
               if(user.followers.find(follower=>follower.username===username)){
                   userr.followers.filter(follower!==username)
               }else{
                   userr.followers.push({
                       username,
                       createdAt:new Date.toString()
                   })
               }
               await userr.save()
               return{
                username: user.username,
                email: user.email, 
                id: user._id,
                token: user.token,
                post:arr,
                followers:user.followers     
               }  
        }
    }
}