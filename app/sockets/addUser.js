const User = require('../models/User');
const store = require('../constants/index');

module.exports = (socket, io) => {
  return (username = `user #${store.usernames.length}`) => {
    socket.username = username;
    socket.room = 'Lobby';
   
    let newUser = new User({ name: username });
    
    newUser.save().then(res => {
      store.usernames[res._id] = {name: res.name, messages:[], id: res._id};
      
      socket._id = res._id;
      socket.join('Lobby')
            .emit('updatechat', 'SERVER', `you have connected to Lobby`)
            .broadcast.to('Lobby').emit('updatechat', 'SERVER', `${res.name } has connected to this room`)
            .emit('updaterooms', rooms, 'Lobby');

      io.sockets.emit('updateusers', store.usernames);
    })
    .catch(err => {
      console.log(err);
    });    
  };
}