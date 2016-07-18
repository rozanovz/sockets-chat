import { socket } from '../constants/constants';

socket.on('connect', () => {
	let username = prompt("What's your name: ");
    document.getElementById('helloID').innerHTML = `Hello, ${username}`
    socket.emit('adduser', username);
    setInterval(() => socket.emit("::2"), 15000);
});