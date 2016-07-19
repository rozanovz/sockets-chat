import chatUtils  from '../utilities/chatUtils';
import { socket } from '../constants/constants';

socket.on('updaterooms', (rooms, current_room) => {
    document.getElementById('rooms').innerHTML = '';

    for (let value of rooms){
        let li = document.createElement('li');
        if(value == current_room) {
            li.innerHTML = `
            <h4>
                <i class="glyphicon glyphicon-headphones"></i> ${value}
            </h4>`;
            document.getElementById('rooms').appendChild(li);
        } else { 
            li.innerHTML = `
            <h4>
                <i class="glyphicon glyphicon-headphones"></i> 
                <a href="#"> <span>${value}</span> </a>
            </h4>`;
            document.getElementById('rooms').appendChild(li);
        }
    }
});