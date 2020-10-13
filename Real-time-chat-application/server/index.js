const express = require('express');
const socketio = require('socket.io'); //to show smthing in real time
const http = require('http');

//later for deployment, our server is going to required a specific port (in process.env.port)
//or run in port 5000
const PORT = process.env.PORT || 5000

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('We have a new connection.');

  socket.on('disconnect', () => {
    console.log('User had left.');
  })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
