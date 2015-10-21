package resources;

public class TrackRouteEntity
{
	public static final int NO_TRAVEL= 0;
	public static final int TRAVEL = 1;

	
	private String id;
	private String vesselid;
	private String routename;
	private String starttime;
	private String endtime;
	// Store minutes or seconds appropriately
	private double distance;
	private String territories;
	private int status = TrackRouteEntity.NO_TRAVEL;
	private String origin;
	private String destination;
	
	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getOwnerid() {
		return ownerid;
	}

	public void setOwnerid(String ownerid) {
		this.ownerid = ownerid;
	}

	private String ownerid;
	
	
	private VesselEntity vessel;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getVesselid() {
		return vesselid;
	}

	public void setVesselid(String vesselid) {
		this.vesselid = vesselid;
	}

	public String getStarttime() {
		return starttime;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	public double getDistance() {
		return distance;
	}

	public void setDistance(double distance) {
		this.distance = distance;
	}

	public String getTerritories() {
		return territories;
	}

	public void setTerritories(String territories) {
		this.territories = territories;
	}

	public VesselEntity getVessel() {
		return vessel;
	}

	public void setVessel(VesselEntity vessel) {
		this.vessel = vessel;
	}

	/**
	 * @return the endtime
	 */
	public String getEndtime() {
		return endtime;
	}

	/**
	 * @param endtime the endtime to set
	 */
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}

	/**
	 * @return the status
	 */
	public int getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(int status) {
		this.status = status;
	}

	/**
	 * @return the routename
	 */
	public String getRoutename() {
		return routename;
	}

	/**
	 * @param routename the routename to set
	 */
	public void setRoutename(String routename) {
		this.routename = routename;
	}
	
	
}
