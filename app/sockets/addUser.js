const User = require('../models/User');
const store = require('../constants/index');
const jwt = require('jsonwebtoken');

module.exports = (socket, io) => {
  return (token) => {
    jwt.verify(token, 'secret', (err, decoded) => {
      for(let user in store.usernames){
        if(store.usernames[user].token == token){
          let curr = store.usernames[user];
          socket.username = curr.name;
          socket.room = 'Lobby';
          socket._id = curr._id;
          socket.join('Lobby')
                .emit('updatechat', 'SERVER', `you have connected to Lobby`)
                .emit('currentUser', curr.name)
                .broadcast.to('Lobby').emit('updatechat', 'SERVER', `${curr.name} has connected to this room`)
                .emit('updaterooms', store.rooms, 'Lobby');
          io.sockets.emit('updateusers', store.usernames);
          break;
        }
      }
    });
  };
}