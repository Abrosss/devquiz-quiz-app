const mongoose = require('mongoose')

//user schema

const UserSchema = mongoose.Schema({
    username: {
        type:String
    },
    password: {
        type:String,
        required:true
    },
    isAdmin: {
        type:Boolean, 
    
    },
    joined: {
      type: Date,
      default: Date.now,
    }

    
})



const User = module.exports = mongoose.model("User", UserSchema)