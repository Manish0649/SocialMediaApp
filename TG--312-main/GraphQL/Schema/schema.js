const graphql= require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = "manish@123";

const {GraphQLList , GraphQLSchema , GraphQLString ,  GraphQLObjectType }=graphql

const User = require('./models/userModel')

const UserType = new GraphQLObjectType({
    name:"user",
    fields:{
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        bio:{type:GraphQLString},
        profilePic:{type:GraphQLString},
        coverPic:{type:GraphQLString}
    }
})

const authType = new GraphQLObjectType({
    name:"Auth",
    fields:{
        token:{type:GraphQLString},
        user:{type:UserType}
    }
})

const Query = new GraphQLObjectType({
    
})

const Mutation = new GraphQLObjectType({
    name:"mutation",
    fields:{
        register:{
            type:GraphQLString,
            args:{
                name:{type:GraphQLString},
                email:{type:GraphQLString},
                password:{type:GraphQLString}
            },
            async resolve(parent , args){
                let {name , email , password}= args;
                let checkUser = await User.findOne({email});
                if(checkUser){
                    return "user already exist"
                }else{
                    const hash = await bcrypt.hash(password , 10);
                    await User.create({name , email , password:hash});
                    return "user registered successfully"
                }
            }
        },

        loginUser:{
            type:authType,
            args:{
                email:{type:GraphQLString}, 
                password:{type:GraphQLString}
            },
            async resolve(parent , args){
                let {email , password} = args;
                let checkUser = await User.findOne({email});
                if(!checkUser){
                    throw new Error("user not found")
                }else{
                    let checkPassword = await bcrypt.compare(password , checkUser.password);
                    if(!checkPassword){
                        throw new Error("invalid credentials")
                    }else{
                        let token = jwt.sign({id:checkUser._id} , jwt_secret );
                        return {token , user:checkUser}
                    }
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:'',
    mutation:Mutation
})