const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minLength:[6,'password must contain at least 6 characters']},   
    post:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],
    token:{type:String},
    followers:[ {
        username: String,
        createdAt:String,
      }],
      followings: [{
        username: String,
        createdAt:String,
      },
    ]
  
},{new:true})   

module.exports = mongoose.model('User',UserSchema)   