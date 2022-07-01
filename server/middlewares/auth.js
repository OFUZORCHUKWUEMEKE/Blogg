const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../utils/config')

const verifyToken = asyncHandler(async(req,res,next)=>{
    const auth = req.headers.authorization 
    
    if(!auth){ 
        throw new Error("You are not Authenticated")
    }   
    // console.log(auth)
    const token = auth.split(' ')[1]
    const verify = jwt.verify(token,SECRET_KEY)
    if(!verify){
        throw new Error('Expired Token')
    }
    req.user = verify
    next() 
})

module.exports = verifyToken 