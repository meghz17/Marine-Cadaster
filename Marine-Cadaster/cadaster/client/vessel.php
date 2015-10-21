<?php include 'main-template.php'; ?>


<?php template("Marine Cadastre - Home Page", content(), 1); ?>

<?php function content() { ob_start(); ?>
	<div class="panel panel-default" style="width: 1200px;">
		<div class="panel-body">
			<div class="page-header" style="text-align: left; padding-bottom: 0px;">
				<table width="100%">
		  			<tr>
		  				<td style="text-align: left"><h3>Vessels</h3></td>
		  				<td><button  style=" font-size: 16px; float: right; margin-right: 1%" id="create-vessel" class="btn btn-success">Create vessel</button></td>
		  			</tr>
		  		</table>
			
			</div>
			
				<div style="font-size: 16px; text-align: left;">  		
			    	<table id="vessel-grid" cellpadding="0" cellspacing="0" border="0" class="datatable table table-hover">
			    </table>	
				
			  			  		
			</div>
		</div>	
   </div>
   <script type="text/javascript">
		load_vessels();

		$("#create-vessel").click(function(){
				create_vessel();
			});
   </script>
<?php return ob_get_clean(); } ?>