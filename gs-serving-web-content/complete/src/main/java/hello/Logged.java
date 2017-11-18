package hello;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

public class Logged {
	@Autowired
	private UserRepository repository;
	
	private Map<String,String> logedIn;
	public Logged() {
		this.logedIn=new HashMap<String,String>();
	}
	
	public String logIn(String user, String pass) {
		User u=repository.findByUsername(user);
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
