const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var colors = require('colors');
var username = "Anonym";
colors.enable();





app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('join', (username) => {
      console.log(username + " connected");
      io.emit('chat join', username);
    });

    socket.on('leave', (username) => {
      console.log(username + " disconnected");
      io.emit('chat leave', username);
    });

    socket.on('disconnect', () => {
      console.log(username.red + ' close the Browser or the tab'.red);
      io.emit('chat fastleave', username);
    });

    socket.on('user-name', (username) =>{
      io.emit('chat join', username);
      console.log(username.green + " joined".green);
    })

    socket.on('chat message', (msg, username) => {
      io.emit('chat message', username, msg);
      console.log(username.blue + ": " + msg.yellow);
    });
});

server.listen(3000, () => {
    console.log('Server is activ'.bgGreen); // Server status
    console.log('listening on Port 3000 \n\n'); // Server Port
});