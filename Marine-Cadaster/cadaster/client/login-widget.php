<?php function login_widget() { ?>
	<form class="form-horizontal" action="#" method="get" id="login_form" style="text-align: center" >
		<div class="form-group">
			<div>
				<input data-validation="email" data-validation-error-msg="You did not enter a valid e-mail" 
						class="form-control input-lg" id="email" placeHolder="Email">
			</div>
		</div>
		<div class="form-group">
			<div>
	    		<input data-validation="required" data-validation-error-msg="You did not enter a password" 
	    				class="form-control input-lg" type="password" id="password" placeHolder="Password">
	    	</div>
	 	</div>
  		<div class="form-group">
			<div>
	 			<input value="Log In" type="submit" class="btn btn-primary btn-lg btn-block" name="Login">
	 		</div>
		</div>
	</form>
	<script>
	  $.validate({
	    validateOnBlur : false, // disable validation when input looses focus
	    //errorMessagePosition : 'top', // Instead of 'element' which is default
	    scrollToTopOnError : false, // Set this property to true if you have a long form
	    onValidate : function() {
		    {
			    
		    }
	    },
	    onSuccess : function() {
		    login_request();
		    return false; 
	      },
	  });
	</script>
<?php } ?>