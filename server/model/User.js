const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    post:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],
    token:{type:String},
    coverPhoto:{type:String},
    bio:{type:String},
    followers:[  {
        username:String,
        createdAt:String 
    }],
    following:[
        {
            username:String,
            createdAt:String  
        }
    ],
    bio:[{type:mongoose.Schema.Types.ObjectId,ref:'Bio'}]
  
},{new:true})   

module.exports = mongoose.model('User',UserSchema)