const express = require('express');
// const cors = require('cors');
const app = express();
const port = 8090;
// app.use(express.json())  
const mongodbConnection = require('./config/db')  //function
mongodbConnection()

const {graphqlHTTP} = require('express-graphql');
const Auth = require('./middleware/Auth');

app.use('/graphql',graphqlHTTP((req)=>({
    schema , 
    graphiql:true,
    context:{
        user:Auth(req)
    }
})))

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

