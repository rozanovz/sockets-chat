import chatUtils from '../utilities/chatUtils';
import { socket } from '../constants/constants';

socket.on('updateusers', users => {
    let userMessages = [];

    document.getElementById('users').innerHTML = '';    
    
    $.each(users, (key, value) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <h4>
                <i class="glyphicon glyphicon-user"></i> <span>${value.name}</span>
            </h4>
        `;
       document.getElementById('users').appendChild(li);

       if(value.messages.length > 0){
		   	value.messages.forEach( key => {
                let li = document.createElement("li");
		   		li.innerHTML = `(${chatUtils.dateGet(key.date)}) ${value.name} :</b> ${key.txt}`;
		   		userMessages = [...userMessages, li];
		   	});
       }
    });

    userMessages.sort().forEach( key => {
    	document.getElementById('conversation').appendChild(key);
    });
});