module.exports = (socket, io) => {
	return newroom => {
	  socket.broadcast.to(socket.room)
	        .emit('updatechat', 'SERVER', `${socket.username} has left this room`)
	        .leave(socket.room)
	        .join(newroom)
	        .emit('updatechat', 'SERVER', `you have connected to ${newroom}`)
	        .broadcast.to(newroom)
	        .emit('updatechat', 'SERVER', `${socket.username}  has joined this room`)
	        .emit('updaterooms', rooms, newroom, socket.username);
	  socket.room = newroom;
	};
}