<?php function template( $title, $content, $selected_index ) { ?>
<?php
  $bg = array('background.png', 'background1.png', 'background2.png', 'background3.png', 'background4.png', 'background5.png', 'background6.png', 'background7.png', 'background8.png'); // array of filenames

  $i = rand(0, count($bg)-1); // generate random number size of the array
  $selectedBg = "$bg[$i]"; // set variable equal to which random filename was chosen
?>
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title><?php echo $title; ?></title>
	<?php include 'headers.php'; ?>
	<style type="text/css">
		<!--
		body{
		background: url(images/<?php echo $selectedBg; ?>);
		}
	-->
	</style>
	
	</head>
	    <body>
	    	<div id="content" style="text-align: center">
	    		<div id="content-header"><?php header_nav_widget($selected_index); ?></div>
	    		
		    	<script>
// 					$("#display_username").html(current_user.name + " <b class='caret'></b>");
// 					$("#logout_btn").bind("click", function(){
// 						logout_request();
// 					});
					
		    	</script>
	    		<div id="content-body">
	    			<center>
	    				<?php echo $content; ?>
					</center>
	    		</div>
	    		<br/><br/><br/><br/>
			</div>
		
		<script type="text/javascript">
				checkUserName();
				$("#logout_btn").click(function(){

					logout_request();
					
				});
						
   		</script>
			
			
	    </body>
	    <hr width="100%" color="black">

	</html>

<?php } ?>