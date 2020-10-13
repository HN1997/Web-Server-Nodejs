const express = require('express');
const socketio = require('socket.io'); //to show smthing in real time
const http = require('http');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');

//later for deployment, our server is going to required a specific port (in process.env.port)
//or run in port 5000
const PORT = process.env.PORT || 5000

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('join', ({name, room}, callback) => {
      const {error, user} = addUser({id: socket.id, name, room});

      if(error) return callback(error);

      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});

      //send a message to everyone
      socket.broadcast.to(user.room).emit('message', {user: 'admin', text:`${user.name}, has joined!`});

      //joins a user in a room
      socket.join(user.room);

      callback();
  });

  socket.on('SendMessage', (message, callback) => {
    const user = getUser(socket.id); //specific client user

    io.to(user.room).emit('message', {user: user.name, text: message});

    callback();
  });

  socket.on('disconnect', () => {
    console.log('User had left.');
  })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
