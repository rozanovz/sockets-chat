import { startUpload, fileChosen, switchRoom, createOnClick, createOnEnter } from './utilities/chatUtils';
import { socket } from './constants/constants';

(() => {
    if (window.File && window.FileReader) {
        document.getElementById('uploadButton').addEventListener('click', startUpload);  
        document.getElementById('fileBox').addEventListener('change', fileChosen);
    } else {
        document.getElementById('statusArea').innerHTML = "Your Browser Doesn't Support The File API Please Update Your Browser";
    }

    document.getElementById('rooms').addEventListener('click', event => switchRoom(`${event.target.innerHTML}`));
    document.getElementById('datasend').addEventListener('click', event => createOnClick('data', 'sendchat'));
    document.getElementById('roombutton').addEventListener('click', event => createOnClick('roomname', 'create room'));
    document.getElementById('data').addEventListener('keypress', event => createOnEnter(event, 'sendchat'));   
    document.getElementById('roomname').addEventListener('keypress', event => createOnEnter(event, 'create room'));   
})();

import './socket/index';