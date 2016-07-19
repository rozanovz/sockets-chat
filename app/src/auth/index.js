(function(){
	document.getElementById('submitButton').addEventListener('click', function(){
		let username = document.getElementById('username');
		let password = document.getElementById('password');
		$.ajax({
		    type: "POST",
		    url: "/auth",
		    data: JSON.stringify({username: username.value, password: password.value}),
		    contentType: 'application/json',
		    success: function(data) {
	            window.location.pathname = '/chat'
	        }
		});
	})
})()