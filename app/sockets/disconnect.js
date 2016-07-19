const store = require('../constants/index');

module.exports = (socket, io) => {
	return  () => {
	    delete store.usernames[socket.username];
	    io.sockets.emit('updateusers', store.usernames);
	    socket.broadcast.emit('updatechat', 'SERVER', `${socket.username} has disconnected`)
	          .leave(socket.room);
	}
};