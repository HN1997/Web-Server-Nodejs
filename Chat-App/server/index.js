const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

//get router from router.js
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);



//when a new connection occurs.
io.on('connect', (socket) =>{
    console.log('we have a new connection');

    //We now have access on the backend to name and room
    socket.on('join', ({name,room})=>{
        console.log(name, room);
    });

    //when a user disconnect
    socket.on('disconnect', ()=>{
        console.log('User had left');
    });
});


//listening to port 5000
server.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`));