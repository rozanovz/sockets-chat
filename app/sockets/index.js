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

	  socket.on('disconnect', disconnect(socket, io));
	  socket.on('create room', createRoom(socket, io));
	  socket.on('switchRoom', switchRoom(socket, io));
	  socket.on('sendchat', sendChat(socket, io));
	  socket.on('getUser', addUser(socket, io));
	  socket.on('start', startUpload(socket, io));
	  socket.on('upload', upload(socket, io));
	}
}