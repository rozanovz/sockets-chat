import { switchRoom } from '../utilities/chatUtils';
import { socket } from '../constants/constants';

socket.on('updaterooms', (rooms, current_room) => {
    let roomsEl = document.getElementById('rooms');
    roomsEl.innerHTML = '';

    $.each(rooms, (key, value) => {
        let li = document.createElement('li');
        if(value == current_room) {
            li.innerHTML = `
            <h4>
                <i class="glyphicon glyphicon-headphones"></i> ${value}
            </h4>
            `;
        	roomsEl.appendChild(li);
                    
        } else { 
            li.innerHTML = `
            <h4>
                <i class="glyphicon glyphicon-headphones"></i> 
                <a href="#"> <span>${value}</span> </a>
            </h4>
            `;

            roomsEl.appendChild(li);
        }
    });
});