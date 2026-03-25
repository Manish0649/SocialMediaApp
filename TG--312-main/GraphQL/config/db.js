const mongoose = require('mongoose');

async function mongodbConnection(){
   try {
    await mongoose.connect('mongodb://localhost:27017/G6graphQl');
    console.log("mongodb connected successfully")
   } catch (error) {
        console.log("error in connecting Db")
   }

}

module.exports = mongodbConnection
