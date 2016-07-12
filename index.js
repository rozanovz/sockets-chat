var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

var usernames = {};
var rooms = ['Lobby'];

io.sockets.on('connection', function(socket) {
  socket.on('create', function(room) {
    rooms.push(room);
    socket.emit('updaterooms', rooms, socket.room);
  });

  socket.on('sendchat', function(data) {
  	usernames[socket.username].messages.push({txt: data, date: new Date()});
    io.sockets["in"](socket.room).emit('updatechat', socket.username, data)
  });

	socket.on('disconnect', function() {
    delete usernames[socket.username];
    io.sockets.emit('udateusers', usernames);
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });

  socket.on('switchRoom', function(newroom) {
    var oldroom;
    oldroom = socket.room;
    socket.leave(socket.room);
    socket.join(newroom);
    socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
    socket.broadcast.to(oldroom).emit('updatechat', 'SERVER', socket.username + ' has left this room');
    socket.room = newroom;
    socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
    io.sockets.emit('updaterooms', rooms, newroom);
  });

  socket.on('adduser', function(username) {
    socket.username = username;
    socket.room = 'Lobby';
    usernames[username] = {name: username, messages:[]};
    socket.join('Lobby');
    socket.emit('updatechat', 'SERVER', 'you have connected to Lobby');
    socket.broadcast.to('Lobby').emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, 'Lobby');
    io.sockets.emit('udateusers', usernames);
  });

});
http.listen(3000, ()=>{
	console.log('listening on 3000');
});