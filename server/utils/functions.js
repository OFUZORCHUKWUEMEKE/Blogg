const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {MONGODB,SECRET_KEY} = require('./config');

const hashPass = async(password)=>{
   const salt = await bcrypt.genSalt(10)
   return bcrypt.hash(password,salt)
}

const comparepass = async(password,savePassword,)=>{
    return bcrypt.compare(password,savePassword)
}

const Encode =(id,username,email)=>{
    return jwt.sign(SECRET_KEY,{id,username,email})
}

module.exports ={hashPass,Encode,comparepass}   