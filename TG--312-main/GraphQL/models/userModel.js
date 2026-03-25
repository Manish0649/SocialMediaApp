const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name:{
        type:String
    },

    email:{
        type:String
        
    },
    password:{
        type:String
    },
    bio:{
        type:String
    },
    profilePic:{
        type:String
    },
    coverPic:{
        type:String
    }
})

let Users = mongoose.model('users' ,userSchema )
module.exports =  Users