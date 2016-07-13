var socket = io();
var fileReader = new FileReader();
var selectedFile;

var switchRoom = function (room){
    socket.emit('switchRoom', room);
}

var makeid = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 25; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

var dateGet = function (val) {
	if(val) {
		return (
			new Date(val).getDate() 	  + '.'   + 
			(new Date(val).getMonth()+1)  + '.'   +
			new Date(val).getFullYear()   + ' @ ' + 
			new Date(val).getHours() 	  + ':'   + 
			new Date(val).getMinutes()    + ':'   + 
			new Date(val).getSeconds()
		);
	} else {
		return (
			new Date().getDate() 	  + '.'   + 
			(new Date().getMonth()+1) + '.'   +
			new Date().getFullYear()  + ' @ ' + 
			new Date().getHours() 	  + ':'   + 
			new Date().getMinutes()   + ':'   + 
			new Date().getSeconds()
		);
	}
}

var startUpload = function() {
    if(document.getElementById('fileBox').value != "") {
        var ex = selectedFile.name.split('.');
        var name = `${makeid()}.${ex[ex.length-1]}`;
        fileReader.onload = function(event){
            socket.emit('upload', {name: name, data: event.target.result});
        }
        socket.emit('start', {name: name, size: selectedFile.size});
        $('#statusArea').html(`
            <div id="loading">
                <div id="spinner"> <img src="./ring.svg" width="10%"/> </div>
                <div id='uploaded'> <span id='mb'> 0 </span> / <span> ${Math.round(selectedFile.size / 1048576)}MB </span> </div> 
            </div>
            `);
    }else{
        alert("Please Select A File");
    }
}


socket.on('moreData', function(data) {
    setTimeout(()=>{
        data.place *= 524288;
        $('#mb').html(`${Math.round(((data.percent/100.0) * selectedFile.size) / 1048576)}`);
        fileReader.readAsBinaryString(selectedFile.slice(data.place, data.place + Math.min(524288, (selectedFile.size - data.place))));
    }, 0)
});

socket.on('done', function(data) {
    $('#conversation').append(`
        <li>
            <span>(${dateGet()}) ${data.user}:</span>
            </b>
            <a href="/download?name=${data.link}" download>
                <i class="glyphicon glyphicon-file"></i>
            </a>
        </li>
    `);
    $('#loading').remove();
});

socket.on('connect', function(){
    socket.emit('adduser', prompt("What's your name: "));
});

socket.on('updatechat', function (username, data) {
    $('#conversation').append('<li>'+'('+dateGet()+') '+ username +':</b> ' + data + '</li>');
});

socket.on('updaterooms', function (rooms, current_room) {
    $('#rooms').empty();
    $.each(rooms,function(key, value) {
        (value == current_room) 
        	? $('#rooms').append('<li><h4><i class="glyphicon glyphicon-headphones"></i> ' + value + '</h4></li>') 
        		: $('#rooms').append('<li><a href="#" onclick="switchRoom(\''+value+'\')"><h4><i class="glyphicon glyphicon-headphones"></i> ' + value + '</h4></a></li>');
    });
});

socket.on('udateusers', function (users) {
    $('#users').empty();

    var userMessages = [];

    $.each(users,function(key, value) {
       $('#users').append('<li><h4><i class="glyphicon glyphicon-user"></i> ' + value.name + '</h4></li>');

       if(value.messages.length > 0){
		   	value.messages.forEach(function(key){
		   		key.txt = '<li>'+'('+dateGet(key.date)+') '+  value.name +':</b> ' +  key.txt + '</li>';
		   		userMessages.push(key);
		   	});
       }
    });

    userMessages.sort().forEach(function(key){
    	$('#conversation').append(key.txt);
    })
});

$(function(){
    $('#datasend').click( function() {
        var message = $('#data').val();
        $('#data').val('');
        socket.emit('sendchat', message);
    });

    $('#roombutton').click(function(){
        var name = $('#roomname').val();
        $('#roomname').val('');
        socket.emit('create', name)
    });

    $('#data').keypress(function(e) {
        if(e.which == 13) {
            $(this).blur();
            $('#datasend').focus().click();
        }
    });

    if (window.File && window.FileReader) {
        $('#uploadButton').click(startUpload);  
        $('#fileBox').change(function(event) {
            return selectedFile = event.target.files[0];
        });
    } else {
        $('statusArea').html("Your Browser Doesn't Support The File API Please Update Your Browser");
    }
});