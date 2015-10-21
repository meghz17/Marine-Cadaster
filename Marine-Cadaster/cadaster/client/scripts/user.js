/**
 * 
 */

var user_base_url = base_url + "user/";

function register_request()
{
	var url = user_base_url + "register";
	var data = 
	{
		name : $("#name").val(),
		email : $("#email").val(),
		password : $("#password").val(),
	};
	
	var success = function ( response ) 
	{
		BootstrapDialog.show({
	        type: BootstrapDialog.TYPE_SUCCESS,
	        closable: true,
	        title: "Success",
	        message: "You have been successfully registered.",
	        buttons: 
	        [
	         {
	            label: 'Back',
	            cssClass: 'btn-default',
	            action: function(dialog)
	            {
	            	dialog.close();
	            	window.location = "http://cadaster.localhost/login.php";
	            }
		     }
	        ]
	    });

		
	};
	
	send_post_request(url, data, success);
}

function login_request()
{
    var url = user_base_url + "login";
	var data = 
	{
		email : $("#email").val(),
		password : $("#password").val()
	};
	
	var success = function ( response ) 
	{
		localStorage.setItem('user', JSON.stringify(response));
		var user = JSON.parse(localStorage.getItem('user'));
		
		if(user.id == null)
		{
			BootstrapDialog.show({
		        type: BootstrapDialog.TYPE_DANGER,
		        closable: true,
		        title: "Error",
		        message: "Please enter your credentials correctly.",
		        buttons: 
		        [
		         {
		            label: 'Back',
		            cssClass: 'btn-default',
		            action: function(dialog)
		            {
		            	dialog.close();
		            	//window.location = "http://cadaster.localhost/login.php";
		            }
			     }
		        ]
		    });

		}
		else
		{
			window.location = "http://cadaster.localhost/index.php";
		}

		
	};
	
	send_post_request(url, data, success);

}

function logout_request()
{
	localStorage.removeItem('user');
	localStorage.removeItem('trackroute');
	localStorage.removeItem('vesselid');
	window.location = "http://cadaster.localhost/login.php";
}

function checkUserName()
{
	var user = JSON.parse(localStorage.getItem('user'));
	if( user.id == null)
	{
		window.location = "http://cadaster.localhost/login.php";
	}
	else
	{
		$('#display_username').text(user.name);
	}
}
