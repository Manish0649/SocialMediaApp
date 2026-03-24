const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser, followUser ,loggedInUser } = require('../controllers/userController');
const authToken = require('../middleware/checkToken');
const router = express.Router();


router.post('/register',registerUser);
router.post('/login', loginUser);
router.put('/update/:id',updateUser)
router.delete('/delete',authToken,deleteUser)
router.put('/follow/:friendId',authToken,followUser)
router.get('/loggedInUser/',authToken,loggedInUser)

module.exports = router;