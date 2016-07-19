//server utils
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

//constants
const store = require('./app/constants/index');

//socket listener
const connectSocket = require('./app/sockets/index');

//mongo models
const User = require('./app/models/User');
const Room = require('./app/models/User');

//mongoose configs
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/socketsChat`);

//express app controllers
const homeCtrl = require('./app/ctrls/home.ctrl');
const chatCtrl = require('./app/ctrls/chat.ctrl');
const downloadCtrl = require('./app/ctrls/download.ctrl');
const authCtrl = require('./app/ctrls/auth.ctrl');

//express configs
app.set("views", __dirname + "/app/views");
app.set("view engine", "jade");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//express routes
app.get('/', homeCtrl);
app.get('/chat', chatCtrl);
app.get('/download', downloadCtrl);
app.post('/auth', authCtrl);

//sockets listeners
io.sockets.on('connection', connectSocket.bind(io)/*socket => {
  Room.find().then( res => res.forEach( key => store.rooms = [...store.rooms, key.name] ));
  User.find().then( res => res.forEach( key => store.usernames[key._id] = {name: key.name, messages: key.messages, id: key._id}));

  socket.on('disconnect', disconnect.bind(socket, io));
  socket.on('create room', createRoom.bind(socket, io));
  socket.on('switchRoom', switchRoom.bind(socket, io));
  socket.on('sendchat', sendChat.bind(socket, io));
  socket.on('adduser', addUser.bind(socket, io));
  socket.on('start', startUpload.bind(socket, io));
  socket.on('upload', upload.bind(socket, io));
}*/);

//launching server
http.listen(3001, () => {
	console.log('listening on 3001');
});