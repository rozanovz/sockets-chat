import chatUtils  from '../utilities/chatUtils';
import { socket } from '../constants/constants';

socket.on('updatechat', (username, data) => {
	let li = document.createElement('li');
	li.innerHTML = `(${chatUtils.dateGet()}) ${username}:</b> ${data})`;
	document.getElementById('conversation').appendChild(li);
});