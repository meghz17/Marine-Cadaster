/**
 * 
 */
var request_count = 0;
var base_url = "http://cadaster.localhost:8080/cadaster/";



function showGlassPane()
{
	if(request_count == 0)
	{
		$("#glass_pane").show();
	}
	request_count++;
}

function hideGlassPane()
{
	request_count--;
	if(request_count <= 0)
	{ 
		request_count = 0;
		$("#glass_pane").hide();
	}
}

function handle_request_error(jqXHR, textStatus, errorThrown)
{
	if(jqXHR.status == 403) 
	{
		alert("Request Failure", "Your session has expired"+errorThrown);
	}
	else if(jqXHR.status == 401)
	{
		alert("Request Failure", "Your session has expired"+errorThrown);
	}
	else
	{
		alert("ERROR: Something went wrong. Please refresh the page");
	}	
}

function send_form_request( _url, _data, success_callback )
{
	$.ajax({
		type: "POST",
		url: _url,
		crossDomain : true,
        async: true,
        contentType: false,
        processData: false,
		data: _data,
        error: function(jqXHR, textStatus, errorThrown) {
        	//alert('error: ' + textStatus);
        	handle_request_error(jqXHR, textStatus, errorThrown);
        },
		success: function( data ) {
			success_callback( data );
		},
	});
}

function send_post_request( _url, _data, success_callback )
{
	$.ajax({
		type: "POST",
		url: _url,
		async: false,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
		data: JSON.stringify(_data),
        error: function(jqXHR, textStatus, errorThrown) {
        	handle_request_error(jqXHR, textStatus, errorThrown);
        },
		success: function( data ) {
			success_callback( data );
		},
	});
}

function send_get_request( _url, success_callback )
{
	$.ajax({
		type: "GET",
		url: _url,
		async: false,
        contentType: "application/json",
        dataType: 'json',
        error: function(jqXHR, textStatus, errorThrown) {
        	//alert('error: ' + errorThrown);
        	handle_request_error(jqXHR, textStatus, errorThrown);        	
        },
		success: function( data ) {
			success_callback( data );		
		},
	});
	
}

