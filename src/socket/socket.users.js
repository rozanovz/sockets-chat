import { dateGet } from '../utilities/chatUtils';
import { socket } from '../constants/constants';

socket.on('updateusers', users => {
    let userMessages = [];
    let conversation = document.getElementById('conversation');  
    let usersEl = document.getElementById('users');
    
    usersEl.innerHTML = '';

    console.log(users);
    
    $.each(users, (key, value) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <h4>
                <i class="glyphicon glyphicon-user"></i> <span>${value.name}</span>
            </h4>
        `;
       usersEl.appendChild(li);

       if(value.messages.length > 0){
		   	value.messages.forEach( key => {
                let li = document.createElement("li");
		   		li.innerHTML = `(${dateGet(key.date)}) ${value.name} :</b> ${key.txt}`;
		   		userMessages = [...userMessages, li];
		   	});
       }
    });

    userMessages.sort().forEach( key => {
    	conversation.appendChild(key);
    });
});