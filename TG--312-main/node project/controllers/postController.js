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
    res.send("get all post function is running")
}
const updatePost = async (req,res)=>{
    res.send("update post function is running")
}
const deletePost = async (req,res)=>{
    res.send("delete post function is running")
}

module.exports = {createPost , getPost , getAllPost , updatePost , deletePost}
