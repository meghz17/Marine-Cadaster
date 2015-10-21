package resources;

import java.sql.SQLException;
import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@Path("/data")
public class DataService
{
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/retrieve/all")
	public ArrayList<WorldMaritimeEntity> retrieveAll() throws SQLException, Exception
	{
		ArrayList<WorldMaritimeEntity> maritimeList = DBConnection.selectMaritime("SELECT * FROM worldmaritime ORDER BY country");
		
		return maritimeList;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/retrieve/vessels")
	public ArrayList<VesselEntity> retrieveVessels() throws SQLException, Exception
	{
		ArrayList<VesselEntity> vesselList = DBConnection.selectVessel("SELECT * FROM vessel");
		
		return vesselList;
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/save/vessel")
	public JSONObject saveVessel(String data) throws SQLException, Exception
	{
		String returnId = "";
		
		JSONObject insertJsonObject = null;
		
		try {
			JSONObject obj = new JSONObject(data);
			
			String name = obj.get("name").toString();
			String ownerid = obj.get("ownerid").toString();
			
			returnId = DBConnection.insert("INSERT INTO vessel (id, name, ownerid) VALUES (@uuid,'"+name+"','"+ownerid+"')");
			
			insertJsonObject = new JSONObject();
			
			insertJsonObject.append("returnid", returnId);

			
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return insertJsonObject;
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/save/vessel/route")
	public TrackRouteEntity saveVesselRoute(String data) throws SQLException, Exception
	{
		ArrayList<TrackRouteEntity> routeList = null;
		String returnId = "";
		try {
			JSONObject obj = new JSONObject(data);
			
			String userid = obj.get("userid").toString();
			String vesselid = obj.get("vesselid").toString();
			String origin = obj.get("origin").toString();
			String destination = obj.get("destination").toString();
			String distance = obj.get("distance").toString();
			String startdate = obj.get("startdate").toString();
			String enddate = obj.get("enddate").toString();
			String routename = obj.get("routename").toString();
			int vesselstatus = TrackRouteEntity.TRAVEL;
			
			
			returnId = DBConnection.insert("INSERT INTO trackroute (id, ownerid, vesselid, routename, origin, destination, distance, starttime, endtime, status) VALUES (@uuid,'"+userid+"','"+vesselid+"','"+routename+"','"+origin+"','"+destination+"','"+distance+"','"+startdate+"','"+enddate+"','"+vesselstatus+"')");
			
			routeList = DBConnection.selectTrackRoute("SELECT * FROM trackroute WHERE (id = '"+returnId+"')");
			
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return routeList.get(0);
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/retrieve/vessel/routes/{userid}/{vesselid}")
	public ArrayList<TrackRouteEntity> retrieveVesselRoutes(@PathParam("userid") String userid, @PathParam("vesselid") String vesselid) throws SQLException, Exception
	{
		ArrayList<TrackRouteEntity> routeList = null;
		try {
			
			routeList = DBConnection.selectTrackRoute("SELECT * FROM trackroute WHERE (vesselid = '"+vesselid+"')");
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return routeList;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/retrieve/single/vessel/route/{trackrouteid}")
	public ArrayList<TrackRouteEntity> retrieveSingleVesselRoutes(@PathParam("trackrouteid") String trackrouteid) throws SQLException, Exception
	{
		ArrayList<TrackRouteEntity> routeList = null;
		try {
			
			routeList = DBConnection.selectTrackRoute("SELECT * FROM trackroute WHERE (id = '"+trackrouteid+"')");
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return routeList;
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/update/vessel/territories")
	public JSONObject updateRouteTerritories(String data) throws SQLException, Exception
	{
		boolean returnId = false;
		
		JSONObject insertJsonObject = null;
		
		try {
			JSONObject obj = new JSONObject(data);
			
			String polygonJson = obj.get("polygonJson").toString();
			
			String id = obj.get("id").toString();
			
			returnId = DBConnection.update("UPDATE trackroute SET territories='"+polygonJson+"' WHERE id='"+id+"'");
			
			insertJsonObject = new JSONObject();
			
			insertJsonObject.append("returnid", returnId);

		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return insertJsonObject;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/retrieve/vessel/route/{trackrouteid}")
	public ArrayList<TrackRouteEntity> retrieveVesselRoute(@PathParam("trackrouteid") String trackrouteid) throws SQLException, Exception
	{
		ArrayList<TrackRouteEntity> routeList = null;
		try {
			
			routeList = DBConnection.selectTrackRoute("SELECT * FROM trackroute WHERE (id = '"+trackrouteid+"')");
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return routeList;
	}



}
