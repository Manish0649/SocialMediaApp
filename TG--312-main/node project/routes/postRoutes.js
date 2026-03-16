const express = require('express');
const { createPost, getAllPost, getPost ,updatePost,deletePost, getUserPosts} = require('../controllers/postController');
const authToken = require('../middleware/checkToken');
const upload = require('../config/multer');
const router = express.Router();

router.post('/create',authToken,upload.single('image'),createPost)
router.get('/get:id',getPost)
router.get('/all',getAllPost)
router.put('/update/:id',updatePost)
router.delete('/delete/:id',deletePost)
router.get('/userPosts',authToken , getUserPosts)

module.exports = router;