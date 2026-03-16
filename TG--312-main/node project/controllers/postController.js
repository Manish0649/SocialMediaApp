const postCollection = require('../models/postModel');
const createPost = async (req,res)=>{
    // res.send("create post function is running")
    try{
       
        const {title} = req.body;
        const userId = req.user;
        let data = await postCollection.insertOne({title,file:req.file.filename,userId})
        res.status(201).json({msg:"post created successfully"})

        
    }catch(error){
        res.status(500).json({msg:"error in creating post"})
    }
    
}
const getPost = async (req,res)=>{
    res.send("get post function is running")    
}
const getAllPost = async (req,res)=>{
    try{
        let allPosts= await postCollection.find().populate({path:"userId",select:"name profilePic"});
        return res.status(200).json({posts:allPosts});
    }catch(error){
        res.status(500).json({msg:"error in getting all posts"})
    }    
}

const getUserPosts = async(req,res)=>{
    try{
        let userId= req.user;
        let posts= await postCollection.find({userId:userId});
        return res.status(200).json({posts:posts});
    }catch(error){
        res.status(500).json({msg:"error in getting user posts"})
    }
    
}

const updatePost = async (req,res)=>{
    const {id}=req.params;
    const {title} = req.body;
    let data = await postCollection.updateOne({_id:id},{$set:{title:title}})
    res.json({msg:"post updated successfully"})
}
const deletePost = async (req,res)=>{
    res.send("delete post function is running")
}

module.exports = {createPost , getPost , getAllPost , updatePost , deletePost , getUserPosts}
