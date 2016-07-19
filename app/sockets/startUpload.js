const store = require('../constants/index');
const fs = require('fs');

module.exports = (socket, io) => {
  return data => { 
    store.uploadedFiles[data.name] = { 
      uploadedFilesize: data.size,
      data: "",
      downloaded: 0,
      name: data.name
    }
    
    if (!fs.existsSync(`./tmp/`)) fs.mkdirSync(`./tmp/`);

    fs.open(`./tmp/${data.name}`, 'a', 0755, (err, fd) => {
      if (err) {
        console.log(err);
      } else {
        store.uploadedFiles[data.name].handler = fd;
        socket.emit('moreData', {place : 0, percent : 0});
      }
    });
  };
}