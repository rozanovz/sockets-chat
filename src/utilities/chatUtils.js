import { socket, fileReader } from '../constants/constants';

export default {
    selectedFile : '',

    switchRoom: room => socket.emit('switchRoom', room),

    getselectedFile: () => this.selectedFile,

    fileChosen: event => this.selectedFile = event.target.files[0],

    createOnEvent : (event, fieldId, socketEvent) => {
        let val = '';

        if(event.keyCode == 13) {
            val = event.target.value;
            event.target.value = '';
        } else if (event.type == 'click') {
            let el = document.getElementById(`${fieldId}`);
            val = el.val
            el.value = '';
        }

        socket.emit(`${socketEvent}` , val);
    },

    dateGet: val => {
        if (val) 
            return `${new Date(val).getDate()}/${new Date(val).getMonth()+1}/${new Date(val).getFullYear()} @ ${new Date(val).getHours()}:${new Date(val).getMinutes()}`;
        else
            return `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} @ ${new Date().getHours()}:${new Date().getMinutes()}`;
    },

    makeid: () => {
        let id = "";
        let pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i=0; i < 25; i++)
            id += pattern.charAt(Math.floor(Math.random() * pattern.length));
        return id;
    },

    startUpload: () => {
        if(document.getElementById('fileBox').value != "") {
            let ex = this.selectedFile.name.split('.');
            let name = `${makeid()}.${ex[ex.length-1]}`;
            fileReader.onload = event => {
                socket.emit('upload', {name: name, data: event.target.result});
            }
            socket.emit('start', {name: name, size: this.selectedFile.size});
            document.getElementById('statusArea').innerHTML = `
                <div id="loading">
                    <div id="spinner"> 
                        <img src="./img/ring.svg" width="10%"/> 
                    </div>
                    <div id='uploaded'> 
                        <span id='mb'> 0 </span> / <span> ${Math.round(this.selectedFile.size / 1048576)}MB </span> 
                    </div> 
                </div>
            `;
        }else{
            alert("Please Select A File");
        }
    },
};