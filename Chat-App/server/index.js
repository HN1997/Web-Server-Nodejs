const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');

const PORT = process.env.PORT || 5001;

//get router from router.js
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);



//when a new connection occurs.
io.on('connect', (socket) =>{

    //We now have access on the backend to name and room
    //here when a new user join a room
    socket.on('join', ({name,room}, callback)=>{
        const {error, user} = addUser({id: socket.id, name, room});

        //if a username exists in a room, we don't let the new
        //user to join
        if(error) return callback(error);

        //emitting a welcome message when a user enters the room
        socket.emit('message', {user: 'admin', text:`${user.name}, welcome to the room ${user.room}`});

        //broadcast send a message to everyone besides 
        //that specific user
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined the chat.`});

        //joins a user in a room
        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

        callback();
    });

    //here we are expecting an event from the backend
    socket.on('sendMessage', (message, callback) => {
        //getting the user who send a message
        const user = getUser(socket.id);

        //emitting message to the user's room with the message of the user
        io.to(user.room).emit('message', {user: user.name, text:message});
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

        //Always call this callback so we can do something
        //after the message is sent on the frontend
        callback();
    });

    //when a user disconnect
    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`});
        }
    });
});


//listening to port 5000
server.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`));