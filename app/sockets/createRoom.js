const Room = require('../models/Room');
const store = require('../constants/index');

module.exports = (socket, io) => { 
  return room => {
    let newRoom = new Room({ name: room });
    newRoom.save().then((res) => {
      Room.find().sort({ name: 1 }).then((res)=>{
        res.forEach((key)=>{
          store.rooms = [...store.rooms, key.name];
        })

        io.sockets.emit('updaterooms', store.rooms, socket.room);
      }).catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };
}