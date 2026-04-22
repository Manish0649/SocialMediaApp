const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:2,
        maxLength:250,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password is required']
    }
},{timestamps:true})
userSchema.add({
    profilePic:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    coverPic:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    followers:[{type:String,ref:'users'}],
    followings:[{type:String,ref:'users'}],
    resetPasswordToken:{
        type:String,
        default:''
    }
})
let Users = mongoose.model('users' ,userSchema )
module.exports =  Users