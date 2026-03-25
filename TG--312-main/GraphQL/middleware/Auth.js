const jwt = require('jsonwebtoken');
const jwt_secret = "manish@123";

const Auth=(req)=>{
    let token= req.headers.authorization;
    if(!token){
        return null
    }
    let decoded = jwt.verify(token, jwt_secret);
    return decoded
}

module.exports = Auth;