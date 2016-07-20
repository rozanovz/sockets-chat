const Room = require('../models/Room');
const store = require('../constants/index');

module.exports = (socket, io) => { 
  return room => {
    let newRoom = new Room({ name: room });
    newRoom.save().then(room => {
      return Room.find().sort({ name: 1 });
    }).then(rooms => {
      rooms.forEach((key)=>{
        store.rooms = [...store.rooms, key.name];
      })
      io.sockets.emit('updaterooms', store.rooms, socket.room);
    })
    .catch(err => {
      console.log(err);
    });
  };
}