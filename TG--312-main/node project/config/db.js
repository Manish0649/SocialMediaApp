const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
async function mongodbConnection(){
   try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@socialmediag6.xfu16vq.mongodb.net/?appName=socialMediaG6`);
    console.log("mongodb connected successfully")
   } catch (error) {
        console.log("error in connecting Db")
   }

}

module.exports = mongodbConnection
