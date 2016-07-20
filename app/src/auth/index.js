(() => {
	document.getElementById('submitButton').addEventListener('click', () => {
		let username = document.getElementById('username');
		let password = document.getElementById('password');
		$.ajax({
		    type: "POST",
		    url: "/auth",
		    data: JSON.stringify({username: username.value, password: password.value}),
		    contentType: 'application/json',
		    success: data => {
		    	console.log(data);
		    	sessionStorage.setItem('token', data.token);
	            window.location.pathname = '/chat';
	        }
		});
	})
})()