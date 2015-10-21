<?php function register_widget() { ?>
	<form class="form-horizontal" action="#" method="get" id="register_form" >
		<div class="form-group">
			<div class="col-sm-14">
				<input data-validation="required" data-validation-error-msg="Name is required" 
						class="form-control" id="name" placeHolder="Name">
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-14">
				<input data-validation="email" data-validation-error-msg="You did not enter a valid e-mail" 
						class="form-control" id="email" placeHolder="Email">
			</div>
		</div>
		
		
		<div class="form-group">
			<div class="col-sm-14">
	    		<input name="pass_confirmation" data-validation="length" data-validation-length="min6" 
	    				class="form-control" type="password" id="password" placeHolder="Password"
	    				data-validation-error-msg="The minimum length of your password must be 6.">
	    	</div>
	 	</div>
		<div class="form-group">
			<div class="col-sm-14">
	    		<input data-validation="required" data-validation-error-msg="Confirm Password is required" class="form-control"
	    				type="password" id="confirmpassword" placeHolder="Confirm Password" name="pass">
	    	</div>
	 	</div>
	 	
  		<div class="form-group">
			<div class="col-sm-14" style="text-align: right">
	 			<input value="Register" type="submit" class="btn btn-primary" name="register" >
	 		</div>
		</div>
	</form>
	<script>
	  $.validate({
	    validateOnBlur : false, // disable validation when input looses focus
	    //errorMessagePosition : 'bottom', // Instead of 'element' which is default
	    scrollToTopOnError : false, // Set this property to true if you have a long form
	    onValidate : function() {
	    	var password = $("#password").val();
		    var confirmpassword = $("#confirmpassword").val();
		    if(password != confirmpassword)
		    {
		    	return { element : $("#confirmpassword"), message: "Passwords must match." };
		    }
	    },
	    onSuccess : function() {
		    register_request();
		    return false; 
	      },
	  });
	</script>
<?php } ?>