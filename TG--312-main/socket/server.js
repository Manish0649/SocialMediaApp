const app = require('express')();
const server = require('http').createServer(app);
const port =3000;
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
        methods:['post','get']
    }
});

let users={}
io.on('connection', (socket) => { 
    console.log(socket.id)
    socket.on('join',(username)=>{
        console.log(`${username} has joined the chat`);
        users[socket.id]=username;
        console.log(users)

        io.emit('message',{type:"System",msg:`new user ${username} joined`})
    })

    socket.on('sendMessage',(msg)=>{
        io.emit('message',{type:users[socket.id],msg:msg})
    })
 });

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});