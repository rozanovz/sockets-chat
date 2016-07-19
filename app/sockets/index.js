const Room = require('../models/Room');
const User = require('../models/User');
const disconnect = require('./disconnect');
const createRoom = require('./createRoom');
const switchRoom = require('./switchRoom');
const sendChat = require('./sendChat');
const addUser = require('./addUser');
const startUpload = require('./startUpload');
const upload = require('./upload');


module.exports = (io) => {
	return socket => {
	  Room.find().then( res => res.forEach( key => store.rooms = [...store.rooms, key.name] ));
	  User.find().then( res => res.forEach( key => store.usernames[key._id] = {name: key.name, messages: key.messages, id: key._id}));

	  socket.on('disconnect', disconnect.bind(socket, io));
	  socket.on('create room', createRoom.bind(socket, io));
	  socket.on('switchRoom', switchRoom.bind(socket, io));
	  socket.on('sendchat', sendChat.bind(socket, io));
	  socket.on('adduser', addUser.bind(socket, io));
	  socket.on('start', startUpload.bind(socket, io));
	  socket.on('upload', upload.bind(socket, io));
	}
}