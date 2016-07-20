import { socket } from '../constants/constants';

socket.on('currentUser', (username) => {
	document.getElementById('helloID').innerHTML = `Hello, ${username}`
});