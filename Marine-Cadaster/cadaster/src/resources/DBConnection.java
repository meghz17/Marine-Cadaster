package resources;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.sql.rowset.CachedRowSet;

public class DBConnection 
{
    /**
     * Method to create DB Connection
     * 
     * @return
     * @throws Exception
     */
    @SuppressWarnings("finally")
    public static Connection createConnection() throws Exception 
    {
        Connection connect = null;
        try {
            Class.forName(Constants.dbClass);
            connect = DriverManager.getConnection(Constants.dbUrl, Constants.dbUser, Constants.dbPwd);
        } catch (Exception e) {
            throw e;
        } finally {
            return connect;
        }
    }
    
    @SuppressWarnings("null")
	public static String insert(String query) throws SQLException, Exception 
    {
    	String returnId = "";
    	int[] records;
    	Connection dbConn = null;
    	try {
    		
	    	try {
	            dbConn = DBConnection.createConnection();
	        } catch (Exception e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	    	
	    	Statement stmt;
			
			stmt = dbConn.createStatement();
			
			String set = "SET @uuid = UUID();";
			String selectUUID = "SELECT @uuid;";
			
			stmt.addBatch(set);
			stmt.addBatch(query);
			
			//stmt.addBatch(selectUUID);
			
			records = stmt.executeBatch();
			
			ResultSet rs = stmt.executeQuery(selectUUID);
			
			if(rs.next())
				returnId = rs.getString("@uuid");
			
			rs.close();
			
	    } catch (SQLException sqle) {
	        //sqle.printStackTrace();
	        throw sqle;
	    } catch (Exception e) {
	        //e.printStackTrace();
	        // TODO Auto-generated catch block
	        if (dbConn != null) {
	            dbConn.close();
	        }
	        throw e;
	    } finally {
	        if (dbConn != null) {
	            dbConn.close();
	        }
	    }
        
        return returnId;
    }
    
    @SuppressWarnings("unchecked")
	public static <T> ArrayList<T> selectMaritime(String query) throws SQLException, Exception 
    {
    	Connection dbConn = null;
    	ArrayList<Object> maritimeList = new ArrayList<Object>();
    	try {
    		
	    	try {
	            dbConn = DBConnection.createConnection();
	        } catch (Exception e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	    	
	    	Statement stmt;
	    	ResultSet rs = null;
			
			stmt = dbConn.createStatement();
			rs = stmt.executeQuery(query);
			
			
			
			while(rs.next())
			{
				WorldMaritimeEntity maritimeObj = new WorldMaritimeEntity();
		         //Retrieve by column name
		         maritimeObj.setId(rs.getString("id"));
		         maritimeObj.setFeature(rs.getString("feature"));
		         maritimeObj.setCountry(rs.getString("country"));
		         maritimeObj.setStatus(rs.getInt("status"));
		         
		         maritimeList.add(maritimeObj);
		      }
		      rs.close();
		
	    } catch (SQLException sqle) {
	        //sqle.printStackTrace();
	        throw sqle;
	    } catch (Exception e) {
	        //e.printStackTrace();
	        // TODO Auto-generated catch block
	        if (dbConn != null) {
	            dbConn.close();
	        }
	        throw e;
	    } finally {
	        if (dbConn != null) {
	            dbConn.close();
	        }
	    }
        
        return (ArrayList<T>) maritimeList;
    }
    
    @SuppressWarnings("unchecked")
	public static <T> ArrayList<T> selectVessel(String query) throws SQLException, Exception 
    {
    	Connection dbConn = null;
    	ArrayList<Object> vesselList = new ArrayList<Object>();
		try {
    		
	    	try {
	            dbConn = DBConnection.createConnection();
	        } catch (Exception e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	    	
	    	Statement stmt;
	    	ResultSet rs = null;
			
			stmt = dbConn.createStatement();
			rs = stmt.executeQuery(query);
			
			
			
			while(rs.next())
			{
				VesselEntity vesselObj = new VesselEntity();
				
				vesselObj.setId(rs.getString("id"));
				vesselObj.setOwnerid(rs.getString("ownerid"));
				String ownerid = rs.getString("ownerid");
				vesselObj.setStatus(rs.getInt("status"));
				vesselObj.setName(rs.getString("name"));
		        
				ArrayList<UserEntity> userList = DBConnection.selectUser("SELECT * FROM user WHERE (id = '"+ownerid+"')");
				vesselObj.setUserid(userList.get(0));
				
				
				vesselList.add(vesselObj);
		      }
		      rs.close();
		
	    } catch (SQLException sqle) {
	        //sqle.printStackTrace();
	        throw sqle;
	    } catch (Exception e) {
	        //e.printStackTrace();
	        // TODO Auto-generated catch block
	        if (dbConn != null) {
	            dbConn.close();
	        }
	        throw e;
	    } finally {
	        if (dbConn != null) {
	            dbConn.close();
	        }
	    }
        
        return (ArrayList<T>) vesselList;
    }
    
    @SuppressWarnings({ "null", "unchecked" })
	public static <T> ArrayList<T> selectUser(String query) throws SQLException, Exception 
    {
    	Connection dbConn = null;
    	ArrayList<Object> userList = new ArrayList<Object>();
		try {
    		
	    	try {
	            dbConn = DBConnection.createConnection();
	        } catch (Exception e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	    	
	    	Statement stmt;
	    	ResultSet rs = null;
			
			stmt = dbConn.createStatement();
			rs = stmt.executeQuery(query);
			
			while(rs.next())
			{
				UserEntity userObj = new UserEntity();
				
				userObj.setId(rs.getString("id"));
				userObj.setEmail(rs.getString("email"));
				userObj.setStatus(rs.getInt("status"));
				userObj.setName(rs.getString("name"));
		        
//				ArrayList<UserEntity> userList = DBConnection.selectUser("SELECT * FROM user WHERE (id = '"+ownerid+"')");
//				vesselObj.setUserid(userList.get(0));
//				
				
				userList.add(userObj);
		      }

			
		    rs.close();
		
	    } catch (SQLException sqle) {
	        //sqle.printStackTrace();
	        throw sqle;
	    } catch (Exception e) {
	        //e.printStackTrace();
	        // TODO Auto-generated catch block
	        if (dbConn != null) {
	            dbConn.close();
	        }
	        throw e;
	    } finally {
	        if (dbConn != null) {
	            dbConn.close();
	        }
	    }
        
        return (ArrayList<T>) userList;
    }

    public static ArrayList<TrackRouteEntity> selectTrackRoute(String query) throws SQLException, Exception 
    {
    	Connection dbConn = null;
    	ArrayList<TrackRouteEntity> routeList = new ArrayList<TrackRouteEntity>();
    	TrackRouteEntity routeObj = null;
    	try {
    		
	    	try {
	            dbConn = DBConnection.createConnection();
	        } catch (Exception e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	    	
	    	Statement stmt;
	    	ResultSet rs = null;
			
			stmt = dbConn.createStatement();
			rs = stmt.executeQuery(query);
			
			while(rs.next())
			{
				
				routeObj = new TrackRouteEntity();
		         //Retrieve by column name
				routeObj.setId(rs.getString("id"));
				
				String vesselid = rs.getString("vesselid");
				
				routeObj.setVesselid(rs.getString("vesselid"));
				routeObj.setRoutename(rs.getString("routename"));
				routeObj.setStarttime(rs.getString("starttime"));
				routeObj.setEndtime(rs.getString("endtime"));
				routeObj.setOrigin(rs.getString("origin"));
				routeObj.setDestination(rs.getString("destination"));
				routeObj.setDistance(rs.getDouble("distance"));
				routeObj.setTerritories(rs.getString("territories"));
				routeObj.setStatus(rs.getInt("status"));
				routeObj.setOwnerid(rs.getString("ownerid"));
		         
				ArrayList<VesselEntity> vesselList = DBConnection.selectVessel("SELECT * FROM vessel WHERE (id = '"+vesselid+"')");
				
				routeObj.setVessel(vesselList.get(0));
				
				routeList.add(routeObj);
		      }
		      rs.close();
		
	    } catch (SQLException sqle) {
	        //sqle.printStackTrace();
	        throw sqle;
	    } catch (Exception e) {
	        //e.printStackTrace();
	        // TODO Auto-generated catch block
	        if (dbConn != null) {
	            dbConn.close();
	        }
	        throw e;
	    } finally {
	        if (dbConn != null) {
	            dbConn.close();
	        }
	    }
        
        return routeList;
    }

    public static boolean update(String query) throws SQLException, Exception 
    {
    	int records = 0;
    	boolean status = false;
    	Connection dbConn = null;
    	try {
    		
        	try {
                dbConn = DBConnection.createConnection();
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        	
        	Statement stmt;
    		
    		stmt = dbConn.createStatement();
    		
    		records = stmt.executeUpdate(query);
    		
    		if(records > 0)
    			status = true;
    		
    		
        } catch (SQLException sqle) {
            //sqle.printStackTrace();
            throw sqle;
        } catch (Exception e) {
            //e.printStackTrace();
            // TODO Auto-generated catch block
            if (dbConn != null) {
                dbConn.close();
            }
            throw e;
        } finally {
            if (dbConn != null) {
                dbConn.close();
            }
        }
        
        return status;
    }

    
}


