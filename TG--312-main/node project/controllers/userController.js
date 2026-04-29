const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const userCollection = require('../models/userModel')
const jwt=require('jsonwebtoken');
const jwt_secret="manish@123";
const dotenv = require('dotenv') //to access the env variables
dotenv.config() 
const nodemailer = require("nodemailer");
const randomString = require("randomstring")


const registerUser = async(req, res)=>{
    // console.log(req.body);
    const   {name, email, password} = req.body
    try{
    let checkUser = await userCollection.findOne({email:email})  // 
    if(checkUser){
        return res.json({msg:"user already registered"})
    }
    else{
        const hashPassword = bcrypt.hashSync(password, salt);
        let data = await userCollection.insertOne({name, email,password:hashPassword})
        res.json({msg:"user registered successfully"})
    }
}catch(error){
res.status(500).json({msg:"error in updating user", error:error.message})
}
    
}


const loginUser = async(req,res)=>{
    // res.send("login function is running")
    const {email , password} = req.body;  //password --> 123455

    let checkUser = await userCollection.findOne({email}); //{id, email, password} or null
    if(checkUser){
        // let comparePassword = await bcrypt.hash('originalPass', 'hashPass')
        let comparePassword = await bcrypt.compare(password, checkUser.password)//true or false
        if(comparePassword){
            let token=await jwt.sign({_id:checkUser._id}, jwt_secret);
            return res.status(200).json({msg:"user log in successfully" ,token})
        }
        else{
            return res.status(401).json({msg:"wrong password"})
        }
    }
    else{
        return res.status(401).json({msg:"user not found please signup"})
    }
}

const loggedInUser = async(req,res)=>{
    let userId=req.user
    let user = await userCollection.findById(userId);
    res.status(200).json({user})

}

const updateUser = async(req,res)=>{
    // res.send("update function is running")

    const {id}=req.params;
    const {name, password} = req.body;
    if(password){
        var hashPassword=await bcrypt.hash(password,salt);
    }
    let data = await userCollection.updateOne({_id:id},{$set:{name:name, password:hashPassword}})
    res.json({msg:"user updated successfully"})
}

const deleteUser = async(req,res)=>{

    // console.log(req.params)
    // let {id} = req.params
    // let token =req.headers.authorization;
    // console.log(token)
    // let verify=jwt.verify(token,jwt_secret);
    // console.log(verify);
    let userId=req.user
    let data = await userCollection.deleteOne({_id:userId})
    res.json({msg:"user deleted successfully"})

}

const followUser = async(req, res)=>{
    let {friendId}=req.params
    let userId=req.user

    let user = await userCollection.findById(userId);
    let friend = await userCollection.findById(friendId);

    if(user.followings.includes(friendId)){
        user.followings.pull(friendId);
        friend.followers.pull(userId);
        await user.save()
        await friend.save()
        return res.status(200).json({msg:"user unfollowed successfully"})
    }
    else{
        user.followings.push(friendId);
        friend.followers.push(userId);
        await user.save()
        await friend.save()
        return res.status(200).json({msg:"user followed successfully"})
    }
}

const forgetPassword = async(req, res)=>{
    const {email} = req.body;
    let user = await userCollection.findOne({email})
    if(user){
        let resetToken = randomString.generate(50)
        user.resetPasswordToken = resetToken;
        await user.save();
        const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
        auth: {
            user: 'manishbansal5412@gmail.com',
            pass: process.env.APP_PASSWORD
        },        
        });
    
try {
  const info = await transporter.sendMail({
    from: '"SocialMedia Team" <manishbansal5412@gmail.com>', // sender address
    to: email, // list of recipients
    subject: "PassWord Reset", // subject line
    text: `click this link to change password \n https://socialmediaapp-aqir.onrender.com/users/resetPassword/${resetToken}`, // plain text body
    // html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return res.status(200).json({msg:"password reset link sent to your email"})

} catch (err) {
  console.error("Error while sending mail:", err);
}


    }else{
        return res.status(401).json({msg:"user not found please signup"})
    }
        
}

const resetPassword = async(req,res)=>{
    console.log(req.params);
    const {token} = req.params
    // res.send("all is well")
    // res.sendFile(__dirname+'/forgetPassword.html')
    res.render('forgetPassword', {token})
}

const updatePassword = async(req,res)=>{
    const {token} = req.params
    const {password} = req.body
    let user = await userCollection.findOne({resetPasswordToken:token})
    if(user){
        let hashPassword = await bcrypt.hash(password, salt)
        user.password = hashPassword;
        user.resetPasswordToken = '';
        await user.save();
        return res.status(200).json({msg:"password updated successfully"})
    }
    else{
        return res.status(401).json({msg:"invalid token"})
    }
}


module.exports = {
        registerUser,
        loginUser,
        updateUser,
        deleteUser,
        followUser,
        loggedInUser,
        forgetPassword,
        resetPassword,
        updatePassword
        
}