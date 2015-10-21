/**
 * 
 */

var data_base_url = base_url + "data/";
var polygons = {};
var features = [];
var featuresMap = {};
var currentClicked;
var coordinate1;
var coordinate2;
var markerCurrent = null;
var marker1 = null;
var marker2 = null;
var pathMarker = null;
var path = [];
var path_territories = {};
var speed = 22;

var polygonArray = [];

var myColorArray = ['#FF9900','#FF0000','#0033CC', '#00CC00', '#FFFF00'];

function coordsToLatLngs(coords, useGeoJSON)
{
	  var first_coord = coords[0],
	      second_coord = coords[1];

	  if (useGeoJSON) {
	    first_coord = coords[1];
	    second_coord = coords[0];
	  }

	  return new google.maps.LatLng(first_coord, second_coord);
	};

function arrayToLatLng(coords, useGeoJSON) 
{
	  var i;

	  for (i = 0; i < coords.length; i++) {
	    if (!(coords[i] instanceof google.maps.LatLng)) {
	      if (coords[i].length > 0 && typeof(coords[i][0]) === "object") {
	        coords[i] = arrayToLatLng(coords[i], useGeoJSON);
	      }
	      else {
	        coords[i] = coordsToLatLngs(coords[i], useGeoJSON);
	      }
	    }
	  }

	  return coords;
}


function retrieveAll()
{
	var url = data_base_url + "retrieve/all";	  
		
	var success = function ( response ) 
	{
		
		
		for (var i = 0; i < response.length; i++) 
		{
			features[i] = response[i];
			featuresMap[features[i].id] = JSON.parse(features[i].feature);
			
			var helper = $('#helper');
			var id = features[i].id;
			
			var $container = $('<div class="countryCheckbox"><input id="' + id + '" type="checkbox" value="' + id + '_value"><label style="margin-left: 2%;">'+(featuresMap[id]).properties.country+'</label></div>');
			$container.insertBefore(helper);

		}	
		
		$('#myform :checkbox').change(function() 
		{
		    var current = $(this);
		    // $this will contain a reference to the checkbox   
		    if (current.is(':checked')) 
			{
		    	checked(current[0].id);
		    } 
		    else 
			{
				unchecked(current[0].id);
		    }
		});	

		
		
	};
	
	send_get_request(url, success);
}

function checked(id)
{
	var coordinates = featuresMap[id].geometry.coordinates;
	var type = featuresMap[id].geometry.type;
	var territory_name = featuresMap[id].properties.country;
	var rand = myColorArray[Math.floor(Math.random() * myColorArray.length)];

	if(type == "MultiPolygon")
	{
		for(var i=0; i<coordinates.length; i++)
		{
			var coordinatesPolygon = arrayToLatLng(coordinates[i], true);
			polygons[id+i] = new google.maps.Polygon({
			    paths: coordinatesPolygon,
			    strokeColor: '#FFFFF',
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: rand,
			    fillOpacity: 0.35,
			    territory: territory_name
			  });
			
			polygons[id+i].setMap(map);

			google.maps.event.addListener(polygons[id+i], 'click', function (event) {
		        //alert the index of the polygon
				currentClicked = event.latLng;
				
				if(markerCurrent != null)
				{	
					markerCurrent.setMap(null);
				}
				
				var infowindow = new google.maps.InfoWindow({
					  content: '<div><label>Lat:</label>'+ currentClicked.lat() +'</br><label>Lng:</label>'+ currentClicked.lng() +'</div>'
				  });
				
				markerCurrent = new google.maps.Marker({
				    position: currentClicked,
				    map: map,
				    title: 'Current Selection!'

				  });
				
				markerCurrent.addListener('click', function() {
				    infowindow.open(map, markerCurrent);
				  });
				
			  });
			
			
		}	
	}
	else
	{
		coordinates = arrayToLatLng(coordinates, true);
		polygons[id] = new google.maps.Polygon({
		    paths: coordinates,
		    strokeColor: '#FFFFF',
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: rand,
		    fillOpacity: 0.35,
		    territory: territory_name
		  });
		
		polygons[id].setMap(map);
		
		google.maps.event.addListener(polygons[id], 'click', function (event) {
	        //alert the index of the polygon
			currentClicked = event.latLng;
			
			if(markerCurrent != null)
			{	
				markerCurrent.setMap(null);
			}
			
			var infowindow = new google.maps.InfoWindow({
				  content: '<div><label>Lat:</label>'+ currentClicked.lat() +'</br><label>Lng:</label>'+ currentClicked.lng() +'</div>'
			  });
			
			markerCurrent = new google.maps.Marker({
			    position: currentClicked,
			    map: map,
			    title: 'Current Selection!'

			  });
			
			markerCurrent.addListener('click', function() {
			    infowindow.open(map, markerCurrent);
			  });
			
		  });
		
		
	}	
	
	// Randomly pick color
	
}

function unchecked(id)
{
	if(currentClicked == null)
	{
		
	}	
	else if(google.maps.geometry.poly.containsLocation(currentClicked, polygons[id]) || google.maps.geometry.poly.containsLocation(coordinate1, polygons[id] || google.maps.geometry.poly.containsLocation(coordinate2, polygons[id])))
	{
		if(markerCurrent != null)
		{
			if(google.maps.geometry.poly.containsLocation(markerCurrent.position, polygons[id]))
			{	
				currentClicked = null;
				markerCurrent.setMap(null);
			}
		}
		
		if(marker1 != null)
		{
			if(google.maps.geometry.poly.containsLocation(marker1.position, polygons[id]))
			{	
				$('#input-coordinate-1').val("");
				marker1.setMap(null);
			}
		}
		
		if(marker2 != null)
		{

			if(google.maps.geometry.poly.containsLocation(marker2.position, polygons[id]))
			{	
				$('#input-coordinate-2').val("");
				marker2.setMap(null);
			}
		}
		
	}
	
	polygons[id].setMap(null);
	
	delete polygons[id];
}


function setCoordinate(coordinateNumber)
{
	if(currentClicked != null)
	{
		if(markerCurrent != null)
		{	
			markerCurrent.setMap(null);
		}
		
		if(coordinateNumber == 1)
		{
			coordinate1 = currentClicked;
			
			if(marker1 != null)
			{	
				marker1.setMap(null);
			}
			
			var image1 = {
					url: '/images/red-dot.png',
				  };
			
			var infowindow = new google.maps.InfoWindow({
				  content: '<div><label>Lat:</label>'+ coordinate1.lat() +'</br><label>Lng:</label>'+ coordinate1.lng() +'</div>'
			  });
			
			marker1 = new google.maps.Marker({
			    position: coordinate1,
			    map: map,
			    title: 'Origin!',
			    label: 'O',
			  });
			
			marker1.addListener('click', function() {
			    infowindow.open(map, marker1);
			  });

			
			$('#input-coordinate-1').val(coordinate1.lat() +' , '+ coordinate1.lng());
		}
		else if(coordinateNumber == 2)
		{
			coordinate2 = currentClicked;
			
			if(marker2 != null)
			{	
				marker2.setMap(null);
			}

			var image2 = {
				    url: '/images/green-dot.png',
				  };

			
			var infowindow = new google.maps.InfoWindow({
				  content: '<div><label>Lat:</label>'+ coordinate2.lat() +'</br><label>Lng:</label>'+ coordinate2.lng() +'</div>'
			  });
			
			marker2 = new google.maps.Marker({
			    position: coordinate2,
			    map: map,
			    title: 'Destination!',
			    label: 'D',
			  });
			
			marker2.addListener('click', function() {
			    infowindow.open(map, marker2);
			  });

			$('#input-coordinate-2').val(coordinate2.lat() +' , '+ coordinate2.lng());
		}
	}
	else
	{
		BootstrapDialog.alert("Please check a polygon and click to set the coordinate.");
	}
		
}

function refresh()
{
	currentClicked = null;
	if(markerCurrent != null)
		markerCurrent.setMap(null);
	
	$('#input-coordinate-1').val("");
	coordinate1 = null;
	if(marker1 != null)
		marker1.setMap(null);
	
	$('#input-coordinate-2').val("");
	coordinate2 = null;
	if(marker2 != null)
		marker2.setMap(null);
	
	$('#route-name').val("");
}

function compute()
{
	if(localStorage.getItem("vesselid") == "" || localStorage.getItem("vesselid") == null)
	{
		BootstrapDialog.show({
            type: BootstrapDialog.TYPE_DANGER,
            title: "Invalid vessel selection!",
            message: "Please choose the vessel first and then  continue.",
            buttons: 
    	        [
    	         {
    	            label: 'Ok',
    	            cssClass: 'btn-default',
    	            action: function(dialog)
    	            {
    	            	dialog.close();
    	            }
    		     }
    	        ]
        }); 
		
		return;
	}
	
	var computed = false;
	var routename = $("#route-name").val();
	
	if(coordinate1 == null || coordinate2 == null || routename == "")
	{
		BootstrapDialog.show({
            type: BootstrapDialog.TYPE_DANGER,
            title: "Invalid Route Details!",
            message: "Name the route and set the route coordinates properly.",
            buttons: 
    	        [
    	         {
    	            label: 'Ok',
    	            cssClass: 'btn-default',
    	            action: function(dialog)
    	            {
    	            	dialog.close();
    	            }
    		     }
    	        ]
 
        }); 

		
	}
	else
	{
		var distance = (google.maps.geometry.spherical.computeDistanceBetween(coordinate1, coordinate2)/1000).toFixed(2) * (0.539957);
		
		var startDate = new Date();
		var endDate = new Date();
		
		var $input = $("<table id='compute-div' width='100%'></table>");
		$input.append($('<tr class="compute"><td class="computeLabel"><label>Route Name</label></td><td><input value="'+routename+'" type="text" class="form-control" readonly></td></tr>'));
		$input.append($('<tr class="compute"><td class="computeLabel"><label>Start Coordinates</label></td><td><input value="Lat: '+coordinate1.lat() + '\t\t Lng: ' + coordinate1.lng()+'" type="text" class="form-control" readonly></td></tr>'));
		$input.append($('<tr class="compute"><td class="computeLabel""><label>End Coordinates</label></td><td><input value="Lat: '+coordinate2.lat() + '\t\t Lng: ' + coordinate2.lng()+'" type="text" class="form-control" aria-describedby="basic-addon1" readonly></div>'));
		$input.append($('<tr class="compute"><td class="computeLabel""><label>Distance</label></td><td><div style="display: flex"><input value="'+distance.toFixed(3)+'" type="text" class="form-control" aria-describedby="basic-addon1" readonly><input style="width: 60%" value="Nautical Miles" type="text" class="form-control" readonly></div></td></tr>'));
		$input.append($('<tr class="compute"><td class="computeLabel"><label>Speed</label></td><td><div style="display: flex"><input id="speed" type="text" class="form-control" value="'+speed+'" aria-describedby="basic-addon1"><input style="width: 60%" value="Nautical Miles / Hour" type="text" class="form-control" readonly></div></td></tr>'));
		$input.append($('<tr class="compute"><td class="computeLabel""><label>Start Time</label></td><td><input id="starttime" type="text" class="form-control" aria-describedby="basic-addon1" readonly></td></tr>'));
		$input.append($('<tr class="compute"><td class="computeLabel"><label>End Time</label></td><td><input id="endtime" type="text" class="form-control" aria-describedby="basic-addon1" readonly></td></tr>'));
		$input.append($('<tr class="compute"><td class="computeLabel"><label>Tax</label></td><td><input id="tax" type="text" class="form-control" aria-describedby="basic-addon1" readonly></td></tr>'));

		BootstrapDialog.show({
	        type: BootstrapDialog.TYPE_PRIMARY,
	        closable: true,
	        title: "Computation",
	        message: $input,
	        buttons: 
	        [
	         {
	            label: 'Calculate',
	            cssClass: 'btn-primary',
	            action: function(dialog)
	            {
	            	computed = true;
	            	
	            	var speed = $("#speed").val(); // 22 nautical miles/hour
	            	
	            	var time = distance / speed;
	            	endDate.setHours(startDate.getHours() + time);
	            	
	            	$("#starttime").val(moment(startDate).format("ddd, MMM D, hh:mm A"));
	            	
	            	$("#endtime").val(moment(endDate).format("ddd, MMM D, hh:mm A"));
	            	
	            }
	         },
	         {
		            label: 'Save',
		            cssClass: 'btn-success',
		            action: function(dialog)
		            {
		            	if(computed)
		            	{	
		            		save_vessel_route(coordinate1, coordinate2, distance, startDate.getTime(), endDate.getTime(), routename);
		            		dialog.close();
		            	}
		            	else
		            	{
		            		BootstrapDialog.show({
		            	        type: BootstrapDialog.TYPE_DANGER,
		            	        closable: true,
		            	        title: "Save Error",
		            	        message: "Please compute various parameters before saving.",
		            	        buttons: 
		            	        [
		            	         {
		            	            label: 'Back',
		            	            cssClass: 'btn-default',
		            	            action: function(dialog)
		            	            {
		            	            	dialog.close();
		            	            }
		            		     }
		            	        ]
		            	    });

		            		
		            	}
		            }
	         },
	         {
	            label: 'Back',
	            cssClass: 'btn-default',
	            action: function(dialog)
	            {
	            	dialog.close();
	            }
		     }
	        ]
	    });

	}	
	
}

function save_vessel_route(coordinate1, coordinate2, distance, startDate, endDate, routename)
{
	var url = data_base_url + "save/vessel/route";	  
	
	var userid = (JSON.parse(localStorage.getItem('user'))).id;
	var vesselid = localStorage.getItem('vesselid');
	
	var data = 
	{
		userid: userid,
		vesselid: vesselid,
		routename: routename,
		origin: coordinate1,
		destination: coordinate2,
		distance: distance,
		startdate: startDate,
		enddate: endDate
	};

	
	var success = function(response) 
	{
		update_vessel_territories(response, coordinate1, coordinate2);
		
		BootstrapDialog.show({
	        type: BootstrapDialog.TYPE_SUCCESS,
	        closable: true,
	        title: "Success",
	        message: "Vessel route successfully saved.",
	        buttons: 
	        [   
	         {
		            label: 'Simulate Travel',
		            cssClass: 'btn-default',
		            action: function(dialog)
		            {
		            	dialog.close();
		            	simulate_travel(response);
		            }
			 },
	         {
	            label: 'Back',
	            cssClass: 'btn-default',
	            action: function(dialog)
	            {
	            	dialog.close();
	            }
		     }
	        ]
	    });
	
	};
	
	send_post_request(url, data ,success);

}

function simulate_travel(trackroute)
{
	var id = trackroute.id;
	var vessel = trackroute.vessel;
	var origin = JSON.parse(trackroute.origin);
	var destination = JSON.parse(trackroute.destination);
	var distance = trackroute.distance;
	var starttime = trackroute.starttime;
	var endtime = trackroute.endtime;
	var user = JSON.parse(localStorage.getItem('user'));
	//var territories = JSON.parse(trackroute.territories);
	
	
	//Simulation function start
	
	$("#set-coordinates").hide();
	$("#compute-refresh").hide();
	
	var flightPlanCoordinates = [{lat: origin.H, lng: origin.L} , {lat: destination.H, lng: destination.L}];
	
	var flightPath = new google.maps.Polyline({
	    path: flightPlanCoordinates,
	    geodesic: true,
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	  });

	  flightPath.setMap(map);
	  var i=1;
	  var length = distance;
	  var remainingDist = length;
	  var step = 100; //miles to move at a time
	  var milliseconds = 1000; // milliseconds to make the change
	  
	  var center = new google.maps.LatLng(origin.H, origin.L);
	  
	  map.setCenter(center);
	  
	  //map.panTo(center);
	  
	  while (remainingDist > 0)
	  {
		 path[i] = flightPath.GetPointAtDistance(1600*step*i);
		 
		 
		 setTimeout(function(x) { return function() { 
			  
			  createMarker(map, flightPath.GetPointAtDistance(1600*step*x), (step*x) + " nautical miles");
			  
		  }; 
			  
		  }(i), milliseconds*i);
		 
	     remainingDist -= step;
	     i++;
	  }
	  
	  setTimeout(function(x) { return function() { 
		  
		  createMarker(map, flightPath.GetPointAtDistance(flightPath.Distance()), (flightPath.Distance()) + " nautical miles");
		  $("#tools").show();
	  }; 
		  
	  }(i), milliseconds*i);
	  
	  
		$("#summary").click(function(){
			travel_summary(trackroute, flightPath);
		});
		
		$("#new-journey").click(function(){
			pathMarker.setMap(null);
			flightPath.setMap(null);
			$("#tools").hide();
			$("#set-coordinates").show();
			$("#compute-refresh").show();
			refresh();
		});
		
}


function createMarker(map, latlng, title)
{
	if(pathMarker != null)
    {
		  pathMarker.setMap(null);
    }
	  
	pathMarker = new google.maps.Marker({
	  position:latlng,
	  map:map,
	  title: title
	  });
	
	// identify if the point lies in any of the polygons!
	for (var polygonid in polygons)
	{
		if(google.maps.geometry.poly.containsLocation(latlng, polygons[polygonid]))
		{
				path_territories[polygonid] = polygons[polygonid].territory;
		}
	}	
}

function update_vessel_territories(trackroute, origin, destination)
{
	var id = trackroute.id;
	var vessel = trackroute.vessel;
	var origin = JSON.parse(trackroute.origin);
	var destination = JSON.parse(trackroute.destination);
	var distance = trackroute.distance;
	var starttime = trackroute.starttime;
	var endtime = trackroute.endtime;
	var user = JSON.parse(localStorage.getItem('user'));

	
	var flightPlanCoordinates = [{lat: origin.H, lng: origin.L} , {lat: destination.H, lng: destination.L}];
	
	var flightPath = new google.maps.Polyline({
	    path: flightPlanCoordinates,
	    geodesic: true,
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	  });

	  //flightPath.setMap(map);
	  var i=1;
	  var length = distance;
	  var remainingDist = length;
	  var step = 100; //miles to move at a time
	  var milliseconds = 1000; // milliseconds to make the change
	  
	  while (remainingDist > 0)
	  {
		 path[i] = flightPath.GetPointAtDistance(1600*step*i);
		 
		 
			for (var polygonid in polygons)
			{
				if(google.maps.geometry.poly.containsLocation(path[i], polygons[polygonid]))
				{
						path_territories[polygonid] = polygons[polygonid].territory;
				}
			}	
	     remainingDist -= step;
	     i++;
	  }
	  
	  for (var polygonid in polygons)
			{
				if(google.maps.geometry.poly.containsLocation(flightPath.GetPointAtDistance(flightPath.Distance()), polygons[polygonid]))
				{
						path_territories[polygonid] = polygons[polygonid].territory;
				}
			}
	
	
	var polygonJson = JSON.stringify(path_territories);
	
	var url = data_base_url + "update/vessel/territories";
	var data = 
	{	
		id : id,
		polygonJson : polygonJson,
	};
	
	var success = function ( response ) 
	{
		var response = response;
		
	};
	
	send_post_request(url, data, success);

}

function travel_summary(trackroute, flightPath)
{
	var id = trackroute.id;
	var vessel = trackroute.vessel;
	var routename = trackroute.routename;
	var origin = JSON.parse(trackroute.origin);
	var destination = JSON.parse(trackroute.destination);
	var distance = trackroute.distance;
	var starttime = trackroute.starttime;
	var endtime = trackroute.endtime;
	var user = JSON.parse(localStorage.getItem('user'));
	
	var displayStartTime = moment(new Date(parseInt(trackroute.starttime))).format("ddd, MMM D, hh:mm A");
	var displayEndTime = moment(new Date(parseInt(trackroute.endtime))).format("ddd, MMM D, hh:mm A");
	var displayTerritories = "";
	for(var id in path_territories)
	{
		displayTerritories += path_territories[id] + "\t";
	}
	
	
	var $input = $("<table id='summary-table' width='100%'></table>");
	$input.append($('<tr class="travel"><td class="travelLabel"><label>Vessel Name</label></td><td><input value="'+vessel.name+'" type="text" class="form-control" readonly></td></tr>'));
	$input.append($('<tr class="travel"><td class="travelLabel"><label>Route Name</label></td><td><input value="'+routename+'" type="text" class="form-control" readonly></td></tr>'));
	$input.append($('<tr class="travel"><td class="travelLabel"><label>Owner Name</label></td><td><input value="'+user.name+'" type="text" class="form-control" readonly></td></tr>'));
	$input.append($('<tr class="travel"><td class="travelLabel"><label>Origin</label></td><td><input value="Lat: '+origin.H + '\t Lng: ' + origin.L+'" type="text" class="form-control" readonly></td></tr>'));
	$input.append($('<tr class="travel"><td class="travelLabel"><label>Destination</label></td><td><input value="Lat: '+destination.H + '\t Lng: ' + destination.L+'" type="text" class="form-control" value="22" readonly></td></tr>'));
	$input.append($('<tr class="travel"><td class="travelLabel"><label>Start Time</label></td><td><input value="'+displayStartTime+'" type="text" class="form-control" readonly></td></tr>'));
	$input.append($('<tr class="travel"><td class="travelLabel"><label>End Time</label></td><td><input value="'+displayEndTime+'" type="text" class="form-control" readonly></td></tr>'));
	$input.append($('<tr class="travel"><td class="travelLabel"><label>Speed</label></td><td><input value="22" type="text" class="form-control" readonly></td></tr>'));
	$input.append($('<tr class="travel"><td class="travelLabel"><label>Distance</label></td><td><input value="'+distance.toFixed(3)+'" type="text" class="form-control" readonly></td></tr>'));
	$input.append($('<tr class="travel"><td class="travelLabel"><label>Territories</label></td><td><input value="'+displayTerritories+'" type="text" class="form-control" readonly></td></tr></table>'));
	$input.append($('<tr><td colspan="2"><div style="height:15px; margin-bottom: 2%;" id="slider-range-min"></div></td></tr>'));
	$input.append($('<tr class="travel"><td class="travelLabel"><div style="display: flex; margin-right: 5%"><label>Time</label></td><td><input id="pathTime" value="0" type="text" class="form-control" readonly></div></td></tr>'));
	$input.append($('<tr class="travel"><td class="travelLabel"><div style="display: flex; margin-right: 5%"><label>Distance</label></td><td><input id="pathDistance" value="0" type="text" class="form-control" readonly></div></td></tr>'));
	$input.append($('<tr class="travel"><td class="travelLabel"><div style="display: flex; margin-right: 5%"><label>Territory</label></td><td><input id="pathTerritory" value="" type="text" class="form-control" readonly></div></td></tr>'));
	
	//$sliderElements.insertAfter($input);

	
	BootstrapDialog.show({
        type: BootstrapDialog.TYPE_PRIMARY,
        closable: true,
        title: "Vessel Travel Summary",
        message: $input,
        onshown: function(dialog)
        {
        	var step = ((1/100)*(parseInt(endtime) - parseInt(starttime)));
        	
        	$( "#slider-range-min" ).slider({
        	      range: "min",
        	      value: parseInt(starttime),
        	      min: parseInt(starttime),
        	      max: parseInt(endtime),
        	      step: step,
        	      change: function( event, ui ) {
        	        
        	    	  var currentTime = ui.value; // milliseconds
        	    	  
        	    	  var currentDistance = (((currentTime - starttime)/(60*60*1000)) * speed);
        	    	  
        	    	  if(currentDistance < distance)
        	    	  {
        	    		for (var polygonid in polygons)
        	    		{
        	    			var currentTerritory = "";
        	    			if(google.maps.geometry.poly.containsLocation(flightPath.GetPointAtDistance(1600*currentDistance), polygons[polygonid]))
        	    			{
        	    					currentTerritory = path_territories[polygonid];
        	    					break;
        	    			}
        	    		}	
        	    		if(currentTerritory == "")
        	    		{
        	    			currentTerritory = "International Waters!";
        	    		}	
        	    	  }
        	    	  
        	    	  $("#pathTime").val(moment(new Date(parseInt(currentTime))).format("ddd, MMM D, hh:mm A"));
        	    	  $("#pathDistance").val(currentDistance);
        	    	  $("#pathTerritory").val(currentTerritory);
        	    	  
        	      }
        	    });
        	
        	$( "#pathTime" ).val($( "#slider-range-min" ).slider( "value" ) );
        	
        },
        buttons: 
        [
         {
        	 label: 'Back',
            cssClass: 'btn-default',
            action: function(dialog)
            {
            	dialog.close();
            }
	     }
        ]
    });

}

function call_simulate_travel(trackrouteid)
{
	var url = data_base_url + "retrieve/vessel/route/"+trackrouteid+"";	  
	
	var success = function ( response ) 
	{
		var trackroute = response[0];
		var origin = JSON.parse(trackroute.origin);
		var destination = JSON.parse(trackroute.destination);
		
		var territories = JSON.parse(trackroute.territories);
		
		var keys = Object.keys(territories);
		
		// Get the id's and check them!
		setTimeout(function(){ 
			
			for(var id in keys)
			{
				$("#"+keys[id]+"").prop("checked", true);
				
				if(keys[id].length > 36)
				{
					keys[id] = keys[id].substring(0, keys[id].length - 1);
					checked(keys[id]);
				}	
			}	

			simulate_travel(trackroute); 
			currentClicked = new google.maps.LatLng(origin.H, origin.L);
			setCoordinate(1);
			currentClicked = new google.maps.LatLng(destination.H, destination.L);
			setCoordinate(2);

			
		}, 3000);
		
		
	};
	
	send_get_request(url, success);
}
