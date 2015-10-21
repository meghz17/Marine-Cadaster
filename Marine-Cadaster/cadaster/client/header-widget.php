<?php function header_widget() { ?>
    	<div class="page-header" style="height: 120px; min-width: 1200px">
    		<table style="width: 100%;  float: right">
    			<tr>
    				<td style="width: 88%; vertical-align: top; text-align: center">
			    		<h1 style="font-size: 4em; font-weight: bold;">
			    			Marine Cadastre
			    			<sup><span class="label label-danger" style="font-size: 0.20em">Alpha</span></sup>
			    		</h1>
    				</td>
    			</tr>
    		</table>
    	</div>
<?php } ?>


<?php function header_nav_widget($selected_index) { ?>
    	<div class="page-nav-header" style="height: 110px; min-width: 1200px">
    		<table style="width: 100%;  float: right">
    			<tr>
    				<td style="width: 88%; vertical-align: top; text-align: center">
			    		<h1 style="font-size: 4em; font-weight: bold; margin-bottom: 3%">
			    			<img height="85" width="500" alt="Brand" src="images/logo.png">
			    				
			    			<sup><span class="label label-danger" style="font-size: 0.280em">alpha</span></sup>
			    		</h1>
    				</td>
    				
    			</tr>
    		</table>
    	</div>
    	<div style="min-width: 1200px;">
    		<nav class="navbar navbar-default navbar-static-top" role="navigation">
    			<div class="container" style="width: 99%;">
					<ul class="nav navbar-nav">
						<li <?php echo !isset($selected_index) || $selected_index == 0 ? "class='active'" : ""; ?> >
							<a href="/index.php" class="btn-lg"><span class="glyphicon glyphicon-home" aria-hidden="true"></span> Home</a>
						</li>
						<li <?php echo !isset($selected_index) || $selected_index == 1 ? "class='active'" : ""; ?> >
							<a href="/vessel.php" class="btn-lg"><span class="glyphicon glyphicon-tint" aria-hidden="true"></span> Vessel</a>
						</li>
						
						<li <?php echo !isset($selected_index) || $selected_index == 2 ? "class='active'" : ""; ?> >
							<a href="/contact.php" class="btn-lg"><span class="glyphicon glyphicon-phone" aria-hidden="true"></span> Contact Us</a>
						</li>
						
					    
					</ul>
					
					<!-- Below is the right side of the navigation bar -->
					<!-- Below is the right side of the navigation bar -->
					    			
					<ul class="nav navbar-nav navbar-right">
						<li <?php echo isset($selected_index) && $selected_index == 10 ? "class='active'" : ""; ?> >
					    	<a id="today-date" href="#" class="btn-lg">[Today's Date]</a>
					    </li>
					
					    <li <?php echo isset($selected_index) && $selected_index == 4 ? "class='active'" : ""; ?> class="dropdown">
					    	<a href="#" class="btn-lg">
					    		<label id="display_username">Username</label> 
					    	</a>
					    </li>
					    <li>
						<a href="#" id="logout_btn" class="btn btn-danger navbar-btn btn-lg" title="Log out" style="color: #fff; margin-bottom: 0px; margin-top: 0px; margin-left: 10px">
							<span class="glyphicon glyphicon-off"></span>
						</a>
						</li>
					</ul>	    
				</div>
    		</nav>
    	</div>
    	<script type="text/javascript">
    		$("#today-date").html("<b>" + moment(new Date()).format("ddd, MMM D, hh:mm A") + "</b>");
		</script>
<?php } ?>