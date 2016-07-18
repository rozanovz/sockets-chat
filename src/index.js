import chatUtils  from './utilities/chatUtils';
import { socket } from './constants/constants';

(() => {
    if (window.File && window.FileReader) {
        document.getElementById('uploadButton').addEventListener('click', chatUtils.startUpload);  
        document.getElementById('fileBox').addEventListener('change', chatUtils.fileChosen);
    } else {
        document.getElementById('statusArea').innerHTML = "Your Browser Doesn't Support The File API Please Update Your Browser";
    }

    document.getElementById('rooms').addEventListener('click', event => chatUtils.switchRoom(`${event.target.innerHTML}`));
    document.getElementById('datasend').addEventListener('click', event => chatUtils.createOnEvent(event, 'data', 'sendchat'));
    document.getElementById('roombutton').addEventListener('click', event => chatUtils.createOnEvent(event, 'roomname', 'create room'));
    document.getElementById('data').addEventListener('keypress', event => chatUtils.createOnEvent(event, null, 'sendchat'));   
    document.getElementById('roomname').addEventListener('keypress', event => chatUtils.createOnEvent(event, null, 'create room'));   
})();

import './socket/index';