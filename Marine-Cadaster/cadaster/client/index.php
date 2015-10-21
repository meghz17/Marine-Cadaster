<?php require_once 'main-template.php'; ?>

<?php template("Marine Cadastre - Home Page", content(), 0); ?>

<?php function content() { ob_start(); ?>

   <div style="width: 1200px; margin-top: 3%">
   	<table style="width: 100%" >
   		<tr>
   		   	<td style="vertical-align: top;">
   		   			<label style="font-family: monospace; font-size: xx-large; margin-bottom: 20%">Countries - EEZ</label>
				   	<div class="img-rounded" id="checkbox-container" style="height: 600px; width: 300px;overflow: scroll;">
				   	<form id="myform">
				   	
				   		<div id="helper"></div>
				   	</form>
				   		
				   	</div>
				
   			</td>
   			<td style="vertical-align: top">
   			
   				<div id="set-coordinates" style="display: -webkit-box;">
   					<div style="width: 20%; display: -webkit-box; margin-right: 4px" class="form-group">
					  <input class="form-control" id="route-name" type="text" placeholder="Name of route">
					</div> 
   					
		   			<div style="width: 40%; display: -webkit-box; margin-right: 4px" class="form-group">
					  <input style="width: 80%;" id="input-coordinate-1" type="text" placeholder="Coordinate-1" class="form-control">
					  <a id="set-coordinate-1" data-toggle="tooltip" title="Set the origin!" style="margin-left: 3px"><button type="button" class="btn btn-default">Set-1</button></a>
					</div> 
					 
					<div style="width: 40%; display: -webkit-box; margin-right: 4px" class="form-group">
					  <input style="width: 80%" class="form-control"  id="input-coordinate-2" type="text" placeholder="Coordinate-2">
					  <a id="set-coordinate-2" data-toggle="tooltip" title="Set the destination!" style="margin-left: 3px"><button type="button" class="btn btn-default">Set-2</button></a>
					</div> 
					
				</div>
   				
   				<div id="compute-refresh">
   					<div style="margin-bottom: 1%; float: right">
						<a id="refresh" data-toggle="tooltip" title="Refresh the coordinates!"><button type="button" class="btn btn-default">Refresh</button></a>
						<a id="compute" data-toggle="tooltip" title="Compute the travel!"><button type="button" class="btn btn-default">Compute</button></a>
					</div>	
   				</div>
   				
   				<div id="tools" style="margin-bottom: 1%; float: right">
					<a id="summary"><button type="button" class="btn btn-default">Summary</button></a>
					<a id="new-journey"><button type="button" class="btn btn-default">New Journey</button></a>
				</div>
   				
   				
	   			<div class="img-rounded" id="map-container" style="height:600px; width: 900px"></div>
	   			
   			</td>
   			
   		</tr>
   	
   	</table>
   	</div>
   <script type="text/javascript">
		$("#tools").hide();
   		
		var map;
		
		function initialize() {  

			  infowindow = new google.maps.InfoWindow(
			    { 
			      size: new google.maps.Size(150,50)
			    });

			    var myOptions = {
			      center:new google.maps.LatLng(51.508742,-0.120850),
			      zoom: 3,
			      mapTypeId: google.maps.MapTypeId.ROADMAP
			    }
			    map = new google.maps.Map(document.getElementById("map-container"), myOptions);

			  } 

		google.maps.event.addDomListener(window, 'load', initialize);
		
		retrieveAll();
		
		$("#set-coordinate-1").click(function(){

			setCoordinate(1);
			
			});
		$("#set-coordinate-2").click(function(){

			setCoordinate(2);
			
		});

		$("#compute").click(function(){

			compute();
			
		});
		$("#refresh").click(function(){

			refresh();
		});

		var trackrouteid = "<?php echo $_GET["trackrouteid"]; ?>";

		if(trackrouteid != "")
		{
			call_simulate_travel(trackrouteid);
		}	
		
</script>   
<?php return ob_get_clean(); } ?>