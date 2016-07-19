import chatUtils  from '../utilities/chatUtils';
import { socket, fileReader } from '../constants/constants';

socket.on('moreData', data => {
    document.getElementById('mb').innerHTML = `${Math.round(((data.percent/100.0) * chatUtils.getselectedFile().size) / 1048576)}`;
    data.place *= 524288;
    fileReader.readAsBinaryString(chatUtils.getselectedFile().slice(data.place, data.place + Math.min(524288, (chatUtils.getselectedFile().size - data.place))));
});

socket.on('done', data => {
    let loading = document.getElementById('loading');

    let li = document.createElement('li');
    li.innerHTML = `
        <span>(${chatUtils.dateGet()}) ${data.user}:</span>
        </b>
        <a href="/download?name=${data.link}" download>
            <i class="glyphicon glyphicon-file"></i>
        </a>
    `

    document.getElementById('conversation').appendChild(li);
    loading.parentNode.removeChild(loading);
});