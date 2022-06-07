const { AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('./config')

module.exports = (context)=>{
    const authHeader = context.req.headers.authorization
    if(authHeader){
        const token = authHeader.split('Bearer ')[1]
        if(token){
          try {
              const user = jwt.verify(token,SECRET_KEY)
              return user
          } catch (error) {
              throw new AuthenticationError('Invalid / Expired Token')
          }
        }
        throw new Error('Authentication token must be \Bearer [token]')
    }
    throw new Error('Authorization header must be provided')
   
    // try {
    //     if(authHeader){
    //         const token = authHeader.split(' ')[1]
    //         if(token){
    //            const user = jwt.verify(token,SECRET_KEY)
    //            return user
    //         }else{
    //             throw new AuthenticationError('Expired Token')
    //         }
    //     }else{ 
    //         throw new AuthenticationError('You are not Authenticated yet')
    //     }
    // } catch (error) {
    //     throw new AuthenticationError('You are not Authenticated')
    // }

}