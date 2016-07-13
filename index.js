const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const url = require('url');

const fs = require('fs');
const exec = require('child_process').exec;
const util = require('util');
const path = require('path');
const mime = require('mime');

app.use(express.static(__dirname + '/public'));

app.get('', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

const usernames = {};
const uploadedFiles = {};
const dir = `./tmp/`;

let rooms = ['Lobby'];

app.get('/download', (req, res) => {
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;

  let file = `${__dirname}/tmp/${query.name}`;
  let filename = path.basename(file);
  let mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);
  
  let filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

io.sockets.on('connection', function(socket) {
  let moreData = (name) => {
    let place = uploadedFiles[name].downloaded / 524288;
    let percent = (uploadedFiles[name].downloaded / uploadedFiles[name].uploadedFilesize) * 100;
    socket.emit('moreData', { place: place, percent: percent});
  }
  
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

  socket.on('start', (data) => { 
    uploadedFiles[data.name] = { 
      uploadedFilesize: data.size,
      data: "",
      downloaded: 0,
      name: data.name
    }
    
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fs.open(`${dir}${data.name}`, 'a', 0755, (err, fd) => {
      if (err) {
        console.log(err);
      } else {
        uploadedFiles[data.name].handler = fd;
        socket.emit('moreData', {place : 0, percent : 0});
      }
    });
  });
  
  socket.on('upload', (data) => {
    let name = data.name;
    uploadedFiles[name].downloaded += data.data.length;
    uploadedFiles[name].data += data.data;
    
    if (uploadedFiles[name].downloaded == uploadedFiles[name].uploadedFilesize) {
      fs.write(uploadedFiles[name].handler, uploadedFiles[name].data, null, 'Binary', function(err, writen){
        io.sockets.emit('done', {link: `${name}`, user: socket.username});
      });
    } else if (uploadedFiles[name].data.length > 10485760){
      fs.write(uploadedFiles[name].handler, uploadedFiles[name].data, null, 'Binary', (err, writen) => {
        uploadedFiles[name].data = "";
        moreData(name);
      });
    } else {
      moreData(name);
    }
  });

});
http.listen(3000, ()=>{
	console.log('listening on 3000');
});