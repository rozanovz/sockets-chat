const moreData = require('./moreData');
const store = require('../constants/index');
const fs = require('fs');

module.exports = (socket, io) => {
  return data => {
    let name = data.name;
    store.uploadedFiles[name].downloaded += data.data.length;
    store.uploadedFiles[name].data += data.data;
    
    if (store.uploadedFiles[name].downloaded == store.uploadedFiles[name].uploadedFilesize) {
      fs.write(store.uploadedFiles[name].handler, store.uploadedFiles[name].data, null, 'Binary', (err, writen) => {
        io.sockets.emit('done', {link: `${name}`, user: socket.username});
      });
    } else if (store.uploadedFiles[name].data.length > 10485760){
      fs.write(store.uploadedFiles[name].handler, store.uploadedFiles[name].data, null, 'Binary', (err, writen) => {
        store.uploadedFiles[name].data = "";
        moreData(name).bind(socket);
      });
    } else {
      moreData(name).bind(socket);
    }
  };
}