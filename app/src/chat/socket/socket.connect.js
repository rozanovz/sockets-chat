import { socket } from '../constants/constants';

socket.on('connect', () => {
    socket.emit('getUser', sessionStorage.getItem('token'));
    setInterval(() => socket.emit("::2"), 15000);
});