<?php include 'main-template.php'; ?>


<?php template("Marine Cadastre - Vessel Route Page", content(), -1); ?>

<?php function content() { ob_start(); ?>
	<div class="panel panel-default" style="width: 1200px;">
		<div class="panel-body">
			<div class="page-header" style="text-align: left; padding-bottom: 0px;">
				<table width="100%">
		  			<tr>
		  				<td style="text-align: left"><h3><label id="vessel-name-in-route" style="font-size: xx-large; font-family: monospace;"></label> &nbsp&nbsp-&nbsp&nbsp Vessel Routes</h3></td>
		  			</tr>
		  		</table>
			
			</div>
			
				<div style="font-size: 16px; text-align: left;">  		
			    	<table id="vessel-route-grid" cellpadding="0" cellspacing="0" border="0" class="datatable table table-hover">
			    </table>	
				
			  			  		
			</div>
		</div>	
   </div>
   <script type="text/javascript">
   		load_vessel_routes("<?php echo $_GET[vesselid]; ?>");

   </script>
<?php return ob_get_clean(); }?>