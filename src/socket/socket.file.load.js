import { getselectedFile, dateGet } from '../utilities/chatUtils';
import { socket, fileReader } from '../constants/constants';

socket.on('moreData', data => {
    let mb = document.getElementById('mb');
    mb.innerHTML = `${Math.round(((data.percent/100.0) * getselectedFile().size) / 1048576)}`;
    data.place *= 524288;
    fileReader.readAsBinaryString(getselectedFile().slice(data.place, data.place + Math.min(524288, (getselectedFile().size - data.place))));
});

socket.on('done', data => {
    let loading = document.getElementById('loading');
    let conversation = document.getElementById('conversation');
    let li = document.createElement('li');

    li.innerHTML = `
        <span>(${dateGet()}) ${data.user}:</span>
        </b>
        <a href="/download?name=${data.link}" download>
            <i class="glyphicon glyphicon-file"></i>
        </a>
    `

    conversation.appendChild(li);
    loading.parentNode.removeChild(loading);
});