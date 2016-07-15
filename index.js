const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

const fs = require('fs');
const url = require('url');
const util = require('util');
const path = require('path');
const mime = require('mime');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/socketsChat', (err) => {
    if (err) { console.log(err) }
});

const User = mongoose.model('User', {
    name: String,
    messages: [{
      txt: String, 
      date: Date
    }]
});
const Room = mongoose.model('Room', {
    name: String
});

const dir = `./tmp/`;

let uploadedFiles = {};
let rooms = ['Lobby'];
let usernames = {};

User.find().then( res => res.forEach( key => usernames[key._id] = {name: key.name, messages: key.messages, id: key._id}));
Room.find().then( res => res.forEach( key => rooms = [...rooms, key.name] ));


app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render("index");
});

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

io.sockets.on('connection', socket => {
  let moreData = name => {
    let place = uploadedFiles[name].downloaded / 524288;
    let percent = (uploadedFiles[name].downloaded / uploadedFiles[name].uploadedFilesize) * 100;
    socket.emit('moreData', { place: place, percent: percent});
  }

  socket.on('disconnect', () => {
    delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });


  socket.on('create room', room => {
    let newRoom = new Room({ name: room });
    newRoom.save().then((res) => {
      Room.find().sort({ name: 1 }).then((res)=>{
        res.forEach((key)=>{
          rooms = [...rooms, key.name];
        })

        io.sockets.emit('updaterooms', rooms, socket.room);
      }).catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  });

  socket.on('switchRoom', newroom => {
    socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
    socket.leave(socket.room);
   
    socket.join(newroom);
    socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
    socket.room = newroom;

    socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
    socket.emit('updaterooms', rooms, newroom, socket.username);
  });

  socket.on('sendchat', data => {
  	usernames[socket._id].messages = [...usernames[socket._id].messages, {txt: data, date: new Date()}];
    User.update({'_id': socket._id}, {'name': socket.name, 'messages': usernames[socket._id].messages}).then((res) => {
      io.sockets["in"](socket.room).emit('updatechat', socket.username, data)
    }).catch((err) => {
      console.log(err);
    });
  });

  socket.on('adduser', username => {
    username = username ? username : `user #${usernames.length}`;
    console.log(username);
    socket.username = username;
    socket.room = 'Lobby';
    let newUser = new User({ name: username });
    newUser.save().then((res) => {
      usernames[res._id] = {name: res.name, messages:[], id: res._id};
      socket._id = res._id;
      socket.join('Lobby');
      socket.emit('updatechat', 'SERVER', 'you have connected to Lobby');
      socket.broadcast.to('Lobby').emit('updatechat', 'SERVER', res.name + ' has connected to this room');
      socket.emit('updaterooms', rooms, 'Lobby');
      io.sockets.emit('updateusers', usernames);
    })
    .catch((err) => {
      console.log(err);
    });    
  });

  socket.on('start', data => { 
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
  
  socket.on('upload', data => {
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

http.listen(3001, () => {
	console.log('listening on 3001');
});