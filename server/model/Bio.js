const mongoose = require('mongoose')

const BioSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    dob:{type:String},
    hobbies:{type:String},
    about:{type:String},     
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    coverPhoto:{type:String,default:'https://i.pinimg.com/474x/8f/1b/09/8f1b09269d8df868039a5f9db169a772.jpg'}  
})  

module.export = mongoose.model('Bio',BioSchema)     