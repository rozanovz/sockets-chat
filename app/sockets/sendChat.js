const User = require('../models/User');
const store = require('../constants/index');

module.exports = (socket, io) => {
  return data => {
  	store.usernames[socket._id].messages = [...store.usernames[socket._id].messages, {txt: data, date: new Date()}];
    
    User.update({'_id': socket._id}, {'name': socket.name, 'messages': store.usernames[socket._id].messages})
    .then(res => {
      io.sockets["in"](socket.room).emit('updatechat', socket.username, data)
    }).catch(err => {
      console.log(err);
    });
  };
}