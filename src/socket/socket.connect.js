import { socket } from '../constants/constants';

socket.on('connect', () => {
	let username = prompt("What's your name: ");
    socket.emit('adduser', username);
    document.getElementById('helloID').innerHTML = `Hello, ${username}`
});