const Post = require("../../model/Post")
const User = require("../../model/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { hashPass, Encode, comparepass } = require("../../utils/functions")
const { ApolloError, AuthenticationError, UserInputError } = require("apollo-server-express")
const { SECRET_KEY } = require("../../utils/config")

function generateToken (user){
    return  jwt.sign({
          id:user.id,
          email:user.email,
          username:user.username
      },SECRET_KEY,{expiresIn:'1h'})
  }

module.exports = {
    Query: {
        getUsers : async()=>{
            const Users = await User.find()
            return Users
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
        }
    }
}