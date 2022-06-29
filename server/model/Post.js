const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    body:{type:String,required:true},
    coverPhoto:{type:String},
    title:{type:String},
    user:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    username:{type:String},
    createdAt:{type:String},
    slug:{type:String},
    published:{type:Boolean,default:false},
    comments:[
        {
            body:String,
            username:String,
            createdAt:String
        } 
    ], 
    likes:[
        {
            username:String,
            createdAt:String
        }
    ],
    
    isPublished:{type:Boolean,default:false}
   
})

module.exports = mongoose.model('Post',PostSchema)