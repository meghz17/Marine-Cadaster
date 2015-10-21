
function load_vessels()
{
	var url = data_base_url + "retrieve/vessels";	  
	
	var success = function(response) 
	{
			var settings =
			{
				datatable  	  	  : 'vessel-grid',
				emptytablemessage : 'You have no vessels.',
				selectable		  : false,
				editable		  : false,
				editurl			  : '/',
				backurl			  : '/',
				deleteurl		  : '/',
				row_selected_css  : 'warning',
				delete_display_col: 1
			};
			
			var columns = 
			[
			 	{ "searchable" : false, "visible" : false}, 
			 	{ title: "Name"}, 
			 	{ title: "Owner"},
			 	{ title: "Status"},
			 	{ title: "Select"},
			 	{ title: "View Travel"}
			 	
			];
			
			var data = [];
			for(var i = 0; i < response.length; i++)
			{
				
				
				var vessel = response[i];
				var status;
				if(vessel.status == 0)
				{
					status = "Not Travelling";
				}	
				else if(vessel.status == 0)
				{
					status = "Travelling";
				}
				else if(vessel.status == 0)
				{
					status = "Travel Completed";
				}
				
				data[i] = 
				[
				 	vessel.id,
				 	vessel.name,
				 	vessel.userid.name,
				 	status,
				 	"<a class='btn btn-success' href='#' onclick=\"(select_vessel('" + vessel.id + " '))\"><span class='glyphicon glyphicon-ok' aria-hidden='true'></span></a>",
				 	"<a class='btn btn-warning' href='#' onclick=\"(view_travel('" + vessel.id + " '))\"><span class='glyphicon glyphicon-globe' aria-hidden='true'></span></a>"
				 	];
				
			}
			grid_load(settings, columns, data);
	};
	
	send_get_request(url, success);

}


function create_vessel()
{
	var $input = $("<div></div>");
	$input.append($('<input type="text" maxlength="50" class="form-control  input-lg" placeHolder="Name of the vessel" id="vessel-name">'));

	BootstrapDialog.show({
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        title: "<b style='font-size: large'>New Vessel</b>",
        message: $input,
        buttons: 
        [
         {
            label: 'Create',
            cssClass: 'btn-success',
            action: function(dialog)
            {
            	if($("#vessel-name").val() != "")
            	{
                	save_vessel($("#vessel-name").val());
                	dialog.close();
            	}
            	else
            	{
            		BootstrapDialog.alert({
            			title : 'Vessel creation error',
            			message : 'You have to name the ship!',
            	        type: BootstrapDialog.TYPE_DANGER            			
            		});
            	}
            }
         },
         {
	            label: 'Back <span class="glyphicon glyphicon-resize-small" aria-hidden="true">',
            cssClass: 'btn-default',
            action: function(dialog)
            {
            	dialog.close();
            }
	     }
        ]
    });
}

function save_vessel(vesselname)
{
	var url = data_base_url + "save/vessel";	  
	
	var user = JSON.parse(localStorage.getItem('user'));
	
	var data = 
	{
		name: vesselname,
		ownerid: user.id
	};

	
	var success = function(response) 
	{
		BootstrapDialog.show({
	        type: BootstrapDialog.TYPE_SUCCESS,
	        closable: true,
	        title: "Success",
	        message: "<p style='font-size: medium'>Vessel successfully created!</p>",
	        buttons: 
	        [
	         {
	            label: 'Back <span class="glyphicon glyphicon-resize-small" aria-hidden="true">',
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

function select_vessel(vesselid)
{
	localStorage.setItem('vesselid', vesselid);
	
	var vesselid = localStorage.getItem('vesselid');
	
	BootstrapDialog.show({
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        title: '<b>Ship selected ! </b>',
        message: "<p style='font-size: medium'>Do you want to set the coordinates for the journey?</p>",
        buttons: 
        [
         {
            label: 'Yes, Let'+"'"+'s Go <span class="glyphicon glyphicon-send" aria-hidden="true">',
            cssClass: 'btn-success',
            action: function(dialog)
            {
            	window.location = "http://cadaster.localhost/index.php";
            }
	     },
	     {
	            label: 'Back <span class="glyphicon glyphicon-resize-small" aria-hidden="true">',
	            cssClass: 'btn-default',
	            action: function(dialog)
	            {
	            	dialog.close();
	            }
	     }
	     
        ]
    });

	
	
}


function view_travel(vesselid)
{
	window.location = "http://cadaster.localhost/vessel-route.php?vesselid="+vesselid+"";
}


function load_vessel_routes(vesselid)
{
	
	var user = JSON.parse(localStorage.getItem('user'));
	
	var url = data_base_url + "retrieve/vessel/routes/"+user.id+"/"+vesselid+"";  
	
	var success = function(response) 
	{
		if(response.length != 0)
			$("#vessel-name-in-route").text((response[0].vessel.name));
		
			var settings =
			{
				datatable  	  	  : 'vessel-route-grid',
				emptytablemessage : 'This vessel has no routes.',
				selectable		  : false,
				editable		  : false,
				editurl			  : '/',
				backurl			  : '/',
				deleteurl		  : '/',
				row_selected_css  : 'warning',
				delete_display_col: 1
			};
			
			var columns = 
			[
			 	{ "searchable" : false, "visible" : false}, 
			 	{ title: "Name"}, 
			 	{ title: "Distance (Nm)"},
			 	{ title: "Start Time"},
			 	{ title: "End Time"},
			 	{ title: "Simulate Route"}
			];
			
			var data = [];
			for(var i = 0; i < response.length; i++)
			{
				var trackroute = response[i];
				data[i] = 
				[
				 	trackroute.id,
				 	trackroute.routename,
				 	(trackroute.distance).toFixed(2),
				 	moment(new Date(parseInt(trackroute.starttime))).format("ddd, MMM D, hh:mm A"),
				 	moment(new Date(parseInt(trackroute.endtime))).format("ddd, MMM D, hh:mm A"),
				 	"<a class='btn btn-warning' href='#' onclick=\"(simulate_path_travel('" + trackroute.id + " '))\"><span class='glyphicon glyphicon-globe' aria-hidden='true'></span></a>"
				];
			}
			grid_load(settings, columns, data);
	};
	
	send_get_request(url, success);
}

function simulate_path_travel(trackrouteid)
{
	var url = data_base_url + "retrieve/single/vessel/route/"+trackrouteid+"";  
	
	var success = function(response) 
	{
		window.location = "http://cadaster.localhost/index.php?trackrouteid="+trackrouteid+"";
	};
	
	send_get_request(url, success);
}

