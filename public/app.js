var socket = io();

function switchRoom(room){
    socket.emit('switchRoom', room);
}

function dateGet(val) {
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
});