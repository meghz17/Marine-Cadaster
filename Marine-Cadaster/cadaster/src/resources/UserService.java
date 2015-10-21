package resources;

import java.sql.SQLException;
import java.util.ArrayList;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@Path("/user")
public class UserService
{
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/register")
	public JSONObject register_request(String data) throws SQLException, Exception
	{
		String returnId = "";
		JSONObject insertJsonObject = null;
		try {
			JSONObject obj = new JSONObject(data);
			
			String name = obj.get("name").toString();
			String email = obj.get("email").toString();
			String password = obj.get("password").toString();
			
			returnId = DBConnection.insert("INSERT INTO user (id, name, email, password) VALUES (@uuid,'"+name+"','"+email+"','"+password+"')");
			
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
	@Path("/login")
	public UserEntity login_request(String data) throws SQLException, Exception
	{
		try {
			JSONObject obj = new JSONObject(data);
			
			String email = obj.get("email").toString();
			String password = obj.get("password").toString();
			
			ArrayList<UserEntity> userList = DBConnection.selectUser("SELECT * FROM user WHERE (email = '"+email+"' AND password = '"+password+"')");
			
			if(userList.size() == 1)
				return userList.get(0);
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		UserEntity nullObject = new UserEntity();
		nullObject.setId(null);
		
		return nullObject;
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/retrieve/user")
	public UserEntity retrieve_User(String data) throws SQLException, Exception
	{
		try {
			JSONObject obj = new JSONObject(data);
			
			String id = obj.get("id").toString();
			
			ArrayList<UserEntity> userList = DBConnection.selectUser("SELECT * FROM user WHERE (id = '"+id+"')");
			
			if(userList.size() == 1)
				return userList.get(0);
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		UserEntity nullObject = new UserEntity();
		nullObject.setId(null);
		
		return nullObject;
	}


}
