<?php
  $bg = array('background.png', 'background1.png', 'background2.png', 'background3.png', 'background4.png', 'background5.png', 'background6.png', 'background7.png', 'background8.png'); // array of filenames

  $i = rand(0, count($bg)-1); // generate random number size of the array
  $selectedBg = "$bg[$i]"; // set variable equal to which random filename was chosen
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Marine Cadastre - Register Page</title>
	<style type="text/css">
		<!--
		body{
		background: url(images/<?php echo $selectedBg; ?>);
		}
	-->
	</style>
<?php include 'headers.php'; ?>
</head>
    <body>
    	<div id="content" style="text-align: center">
    		<div id="content-header"><?php header_widget(); ?></div>
    		<div id="content-body">
    			<center>
					<div class="panel panel-default" style="width: 400px;">
					  <div class="panel-body">
					  	<div class="page-header" style="text-align: left">
					  		<h3>Register</h3>
					  	</div>
					  	<div style="margin-left: 1em; margin-right: 1em;"><?php register_widget(); ?></div>
					  </div>
					</div>
				</center>
    		</div>
    	</div>
    </body>
</html>