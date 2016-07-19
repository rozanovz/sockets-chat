const store = require('../constants/index');

module.exports = (socket) => {
	return name => {
	    let place = store.uploadedFiles[name].downloaded / 524288;
	    let percent = (store.uploadedFiles[name].downloaded / store.uploadedFiles[name].uploadedFilesize) * 100;
	    socket.emit('moreData', { place: place, percent: percent});
	}
}