import chatUtils from '../utilities/chatUtils';
import { socket } from '../constants/constants';

socket.on('updateusers', users => {
    let userMessages = [];

    document.getElementById('users').innerHTML = '';   
    
    for (let value in users){ 
        let li = document.createElement("li");
        li.innerHTML = `
            <h4>
                <i class="glyphicon glyphicon-user"></i> <span>${users[value].name}</span>
            </h4>
        `;
       document.getElementById('users').appendChild(li);

       if(users[value].messages.length > 0){
            users[value].messages.forEach( key => {
                let li = document.createElement("li");
                li.innerHTML = `(${chatUtils.dateGet(key.date)}) ${users[value].name} :</b> ${key.txt}`;
                userMessages = [...userMessages, li];
            });
       }
    };

    userMessages.sort().forEach( key => {
    	document.getElementById('conversation').appendChild(key);
    });
});