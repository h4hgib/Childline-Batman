package hello;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Logged {
	private Map<String,String> logedIn;
	public Logged() {
		this.logedIn=new HashMap<String,String>();
	}
	
	public String logIn(String user, String pass,User u) {
		System.out.println(u.toString());
		if (u.password.equals(pass)) {
			String uuid=UUID.randomUUID().toString();
			logedIn.put(user, uuid);
			return uuid;
		}else {
			return "";
		}
	}
	
	public void logOut(String user) {
		logedIn.remove(user);
	}
	
	public boolean isLoggedIn(String user) {
		return logedIn.containsKey(user);
	}
	
	public boolean isLoggedToken(String token) {
		return logedIn.containsValue(token);
	}

}
