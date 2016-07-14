import { dateGet } from '../utilities/chatUtils';
import { socket } from '../constants/constants';

socket.on('updatechat', (username, data) => {
	let conversation = document.getElementById('conversation');
	let li = document.createElement('li');
	li.innerHTML = `(${dateGet()}) ${username}:</b> ${data})`;
	conversation.appendChild(li);
});