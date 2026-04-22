const express = require('express');
const cors = require('cors');
const app = express();
const port = 8090;


const mongodbConnection = require('./config/db')  //function
const userCollection  = require('./models/userModel')


mongodbConnection()


// import files
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')

app.use(express.json())  //
app.get('/',(req, res)=>{
    res.send('welcome page')
})

app.set('view engine','ejs')
app.use('/uploads',express.static('uploads'))  //to access the images in uploads folder
app.use(cors())  //cors middleware

app.use('/users',userRouter)
app.use('/posts',postRouter)

// example --> http://localhost:8090/users/register , --> registerUser function will run





app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})