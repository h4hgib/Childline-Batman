package hello;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GreetingController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ContactRepository contactRepository;
	
	private Logged loged=new Logged();
	
	@RequestMapping(value="/auth/register", method=RequestMethod.POST)
    @ResponseBody
    public String register(@RequestHeader(value="Authotization", required=true) String token,@RequestParam(value="username", required=true) String username,@RequestParam(value="password", required=true) String password) {
		if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
		userRepository.save(new User(username, password));
		return "{\"success\":200}";
    }
  
    @RequestMapping(value="/auth/login", method=RequestMethod.POST)
    @ResponseBody
    public String login(@RequestParam(value="username", required=true) String username,@RequestParam(value="password", required=true) String password, Model model) {
    	String token="";
	try {
    		token=loged.logIn(username, password,userRepository.findByUsername(username));
	}
    	catch(NullPointerException e) {
    		return "{\"success\":401}"; 
    	}
    		return "{\"token:\":\""+token+"\", \"userData\": {\"username\": " + username + "}}";
    }
    
    @RequestMapping(value="/auth/logout", method=RequestMethod.POST)
    @ResponseBody
    public String logout(@RequestParam(value="username", required=true) String username, Model model) {
    		loged.logOut(username);
    		return "{\"success\":200}";
    }

    @RequestMapping(value="/contacts", method=RequestMethod.POST)
    @ResponseBody
    public String contactsPost(@RequestHeader(value="Authorization", required=true) String token,
    		@RequestParam(value="timestamp", required=true) Long timestamp,
    		@RequestParam(value="method", required=true) String method,
    		@RequestParam(value="category", required=true) String category,
    		@RequestParam(value="requestForAnonimity", required=true) String requestForAnonimity) {
    		if (loged.isLoggedToken(token)==false) {
    			return "{\"success\":401}";
    		}
    		Long i=0l;
    		List<Contact> contacts=contactRepository.findAll();
    		for (Contact c : contacts) {
    			if (c.id > i){
    				i=c.id;
    			}
    		}
    		contactRepository.save(new Contact(i+1,timestamp,method,category, requestForAnonimity));
      return "{\"success\":200}";
    }
    
    @RequestMapping(value="/contacts", method=RequestMethod.GET)
    @ResponseBody
    public String contactsGet(@RequestHeader(value="Authotization", required=true) String token) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
    	List<Contact> contacts=contactRepository.findAll();
      StringBuilder sb =new StringBuilder("[") ;
      if (!contacts.isEmpty()) {
      	for(int i =1; i< contacts.size(); i++) {
			 sb.append(",");
			 sb.append(contacts.get(i).toString());
		 }
      	}
      sb.append("]");
      return sb.toString();
    }
    
    @RequestMapping(value="/contacts/{id}", method=RequestMethod.GET)
    @ResponseBody
    public String contactsWparameters(@RequestParam(value="id", required=true) Long id, @RequestHeader(value="Authotization", required=true) String token) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
      return contactRepository.findById(id).toString();
    }
    
    @RequestMapping(value="/contacts/{id}", method=RequestMethod.POST)
    @ResponseBody
    public String updateContactsWparameters(@RequestParam(value="id", required=true) Long id, @RequestHeader(value="Authotization", required=true) String token,
    		@RequestParam(value="timestamp", required=false) Long timestamp,
    		@RequestParam(value="method", required=false) String method,
    		@RequestParam(value="category", required=false) String category,
    		@RequestParam(value="requestForAnonimity", required=false) String requestForAnonimity) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
    	Contact contact =contactRepository.findById(id);
    if(timestamp!=null) {
    		contact.timestamp=timestamp;
    		contactRepository.save(contact);
    }
    if(method!=null) {
		contact.method=method;
		contactRepository.save(contact);
    }
    if(category!=null) {
		contact.category=category;
		contactRepository.save(contact);
    }
    if(category!=null) {
		contact.requestForAnonimity=requestForAnonimity;
		contactRepository.save(contact);
    }
      return "{\"success\":200}";
    }
    
    

}
