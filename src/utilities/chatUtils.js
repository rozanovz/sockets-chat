import { socket, fileReader } from '../constants/constants';

let selectedFile;

const switchRoom = (room) => socket.emit('switchRoom', room);
const getselectedFile = () => selectedFile;
const fileChosen = (event) => selectedFile = event.target.files[0];

const createOnClick = (fieldId, eventName) => {
    let data = document.getElementById(`${fieldId}`);
    socket.emit(`${eventName}`, data.value);
    data.value = '';
};

const createOnEnter = (event, socketEvent) => {
    if(event.keyCode == 13) {
        socket.emit(`${socketEvent}` , event.target.value);
        event.target.value = '';
    }
};

const dateGet = (val) => {
    if (val) 
        return `${new Date(val).getDate()}/${new Date(val).getMonth()+1}/${new Date(val).getFullYear()} @ ${new Date(val).getHours()}:${new Date(val).getMinutes()}`;
    else
        return `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} @ ${new Date().getHours()}:${new Date().getMinutes()}`;
};

const makeid = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i=0; i < 25; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

const startUpload = () => {
    if(document.getElementById('fileBox').value != "") {
        let ex = selectedFile.name.split('.');
        let name = `${makeid()}.${ex[ex.length-1]}`;
        fileReader.onload = event => {
            socket.emit('upload', {name: name, data: event.target.result});
        }
        socket.emit('start', {name: name, size: selectedFile.size});
        document.getElementById('statusArea').innerHTML = `
            <div id="loading">
                <div id="spinner"> 
                    <img src="./ring.svg" width="10%"/> 
                </div>
                <div id='uploaded'> 
                    <span id='mb'> 0 </span> / <span> ${Math.round(selectedFile.size / 1048576)}MB </span> 
                </div> 
            </div>
        `;
    }else{
        alert("Please Select A File");
    }
};

export { switchRoom }
export { makeid }
export { fileChosen }
export { dateGet }
export { startUpload }
export { getselectedFile }
export { dateGet }
export { createOnClick }
export { createOnEnter }