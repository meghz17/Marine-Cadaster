package resources;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import org.apache.commons.io.FileUtils;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.JSONObject;


public class FileOperation 
{

	public static void main(String[] args) 
	{
		JSONParser parser = new JSONParser();
		
//		/*** read from file ***/
//			URL url;
//			try {
//				url = new URL("http://opendata.arcgis.com/datasets/47a70d4f99864422994c2e60819cf664_12.geojson");
//				File file = new File("/home/ubuntu/development/cadaster/src/resources/mpa.json");
//				try {
//					FileUtils.copyURLToFile(url, file);
//				} catch (IOException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//
//			} catch (MalformedURLException e1) {
//				// TODO Auto-generated catch block
//				e1.printStackTrace();
//			}
			
			Object obj;
			try {
				
				obj = parser.parse(new FileReader("/home/ubuntu1/development/cadaster/src/resources/World_EEZ.json"));
				JSONObject jsonObject = (JSONObject) obj;
				
				JSONArray jsonFeatures = (JSONArray) jsonObject.get("features");
				
				// Add it to the database
				for(int i = 0; i < jsonFeatures.size(); i++)
				{
					JSONObject inter = (JSONObject) jsonFeatures.get(i);
					JSONObject properties = (JSONObject) inter.get("properties");
					JSONObject geometry = (JSONObject) inter.get("geometry");
					String country = properties.get("country").toString();
					String type = geometry.get("type").toString();
					System.out.println(type+'\t'+country);
					
					DBConnection.insert("INSERT INTO worldmaritime (id, feature, polytype,country, status) VALUES (UUID(),'"+inter.toString()+"','"+type+"','"+country+"','"+WorldMaritimeEntity.DATA_PRESENT+"')");

					
				}

				
			
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
		
		
		
		
		
	}

}
