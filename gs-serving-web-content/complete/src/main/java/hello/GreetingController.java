package hello;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
	
	@Autowired
	private ContactRepository1 contactRepository1;
	
	@Autowired
	private ContactRepository2 contactRepository2;
	
	@Autowired
	private ContactRepository3 contactRepository3;
	
	@Autowired
	private ContactRepository4 contactRepository4;
	
	
	private Logged loged=new Logged();
	
	@RequestMapping(value="/auth/register", method=RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public String register(@RequestHeader(value="Authorization", required=true) String token,@RequestParam(value="username", required=true) String username,@RequestParam(value="password", required=true) String password) {
		JSONObject json=new JSONObject();
		if (loged.isLoggedToken(token)==false) {
			return json.append("success", 401).toString();
		}
		userRepository.save(new User(username, password));
		return json.append("success", 200).toString();
    }
  
    @RequestMapping(value="/auth/login", method=RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String login(@RequestParam(value="username", required=true) String username,@RequestParam(value="password", required=true) String password, Model model) {
		JSONObject json = new JSONObject();
    	String token="";
	try {
    		token=loged.logIn(username, password,userRepository.findByUsername(username));
	}
    	catch(NullPointerException e) {
    		return json.append("success", 401).toString(); 
    	}
		JSONObject json2 = new JSONObject();
		json2.append("username", username);
		json.append("token", token);
		json.append("userData", json2);
    		return json.toString();
    }
    
    @RequestMapping(value="/auth/logout", method=RequestMethod.POST)
    @ResponseBody
    public String logout(@RequestParam(value="username", required=true) String username, Model model) {
    		loged.logOut(username);
    		JSONObject json = new JSONObject();
    		return json.append("success", 200).toString();
    }

    //contact
    @RequestMapping(value="/contacts", method=RequestMethod.POST)
    @ResponseBody
    public String contactsPost(@RequestHeader(value="Authorization", required=true) String token,
    		@RequestParam(value="timestamp", required=true) Long timestamp,
    		@RequestParam(value="method", required=true) String method,
    		@RequestParam(value="category", required=true) String category,
    		@RequestParam(value="requestForAnonimity", required=true) String requestForAnonimity) {
    		JSONObject json = new JSONObject();
		if (loged.isLoggedToken(token)==false) {
		json.append("success", 401);
		return json.toString();
	}
    		Long i=0l;
    		List<Contact> contacts=contactRepository.findAll();
    		for (Contact c : contacts) {
    			if(c.id!=null) {
    				if (c.id.compareTo(i)>0){
        				i=c.id;
        			}
    			}
    		}
    		contactRepository.save(new Contact(i+1,timestamp,method,category, requestForAnonimity));
      return json.append("success", 200).toString();
    }
    
    @RequestMapping(value="/contacts", method=RequestMethod.GET)
    @ResponseBody
    public String contactsGet(@RequestHeader(value="Authorization", required=true) String token) {
		JSONObject json = new JSONObject();
    		if (loged.isLoggedToken(token)==false) {
    		json.append("success", 401);
			return json.toString();
		}
    	List<Contact> contacts=contactRepository.findAll();
    	json.append("data", contacts);
      return json.toString();
    }
    
    @RequestMapping(value="/contacts/{id}", method=RequestMethod.GET)
    @ResponseBody
    public String contactsWparameters(@RequestParam(value="id", required=true) Long id, @RequestHeader(value="Authorization", required=true) String token) {
    	JSONObject json = new JSONObject();
    	if (loged.isLoggedToken(token)==false) {
    		json.append("success", 401);
    		return json.toString();
		}
      return contactRepository.findById(id).toJson().toString();
    }
    
    @RequestMapping(value="/contacts/{id}", method=RequestMethod.POST)
    @ResponseBody
    public String updateContactsWparameters(@RequestParam(value="id", required=true) Long id, @RequestHeader(value="Authorization", required=true) String token,
    		@RequestParam(value="timestamp", required=false) Long timestamp,
    		@RequestParam(value="method", required=false) String method,
    		@RequestParam(value="category", required=false) String category,
    		@RequestParam(value="requestForAnonimity", required=false) String requestForAnonimity) {
    	
    	JSONObject json = new JSONObject();
    	if (loged.isLoggedToken(token)==false) {
    		json.append("success", 401);
    		return json.toString();
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
    json.append("success", 200);
	return json.toString();
    }
    
    //contact1
    @RequestMapping(value="/contacts1", method=RequestMethod.POST)
    @ResponseBody
    public String contacts1Post(@RequestHeader(value="Authorization", required=true) String token,
    		@RequestParam(value="diverseCategory", required=true) String diverseCategory,
    		@RequestParam(value="details", required=true) String details,
    		@RequestParam(value="followup", required=true) String followup,
    		@RequestParam(value="followupDetails", required=true) String followupDetails,
    		@RequestParam(value="id", required=true) Long id) {
    	JSONObject json=new JSONObject();
    		if (loged.isLoggedToken(token)==false) {
    			json.append("success", 401);
        		return json.toString();
    		}
    		contactRepository1.save(new Contact1(id,diverseCategory,details,followup, followupDetails));
    		json.append("success", 200);
    		return json.toString();
    }
    
    @RequestMapping(value="/contacts1", method=RequestMethod.GET)
    @ResponseBody
    public String contacts1Get(@RequestHeader(value="Authorization", required=true) String token) {
    	JSONObject json=new JSONObject();
    	if (loged.isLoggedToken(token)==false) {
    		json.append("success", 401);
    		return json.toString();
		}
    	List<Contact1> contacts=contactRepository1.findAll();
    	json.append("data", contacts);
        return json.toString();
    }
    
    @RequestMapping(value="/contacts1/{id}", method=RequestMethod.GET)
    @ResponseBody
    public String contacts1Wparameters(@RequestParam(value="id", required=true) Long id, @RequestHeader(value="Authorization", required=true) String token) {
    JSONObject json=new JSONObject();
    	if (loged.isLoggedToken(token)==false) {
    		json.append("success", 401);
    		return json.toString();
		}
      return contactRepository1.findById(id).toJson().toString();
    }
    
    @RequestMapping(value="/contacts1/{id}", method=RequestMethod.POST)
    @ResponseBody
    public String updateContacts1Wparameters(@RequestParam(value="id", required=true) Long id, @RequestHeader(value="Authorization", required=true) String token,
    		@RequestParam(value="diverseCategory", required=true) String diverseCategory,
    		@RequestParam(value="details", required=true) String details,
    		@RequestParam(value="followup", required=true) String followup,
    		@RequestParam(value="followupDetails", required=true) String followupDetails) {
    	JSONObject json = new JSONObject();
    	if (loged.isLoggedToken(token)==false) {
    		json.append("success", 401);
    		return json.toString();
		}
    	Contact1 contact =contactRepository1.findById(id);
    if(diverseCategory!=null) {
    		contact.diverseCategory=diverseCategory;
    		contactRepository1.save(contact);
    }
    if(details!=null) {
		contact.details=details;
		contactRepository1.save(contact);
    }
    if(followup!=null) {
		contact.followup=followup;
		contactRepository1.save(contact);
    }
    if(followupDetails!=null) {
		contact.followupDetails=followupDetails;
		contactRepository1.save(contact);
    }
    json.append("success", 200);
	return json.toString();
    }
    
    //contact2
    
    @RequestMapping(value="/contacts2", method=RequestMethod.POST)
    @ResponseBody
    public String contacts2Post(@RequestHeader(value="Authorization", required=true) String token,
    		@RequestParam(value="timestamp", required=true) Long timestamp,
    		@RequestParam(value="method", required=true) String method,
    		@RequestParam(value="category", required=true) String category,
    		@RequestParam(value="requestForAnonimity", required=true) String requestForAnonimity,
    		@RequestParam(value="id", required=true) Long id) {
    		if (loged.isLoggedToken(token)==false) {
    			return "{\"success\":401}";
    		}
    		contactRepository2.save(new Contact2(id,timestamp,method,category, requestForAnonimity));
      return "{\"success\":200}";
    }
    
    @RequestMapping(value="/contacts2", method=RequestMethod.GET)
    @ResponseBody
    public String contacts2Get(@RequestHeader(value="Authorization", required=true) String token) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
    	List<Contact2> contacts=contactRepository2.findAll();
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
    
    @RequestMapping(value="/contacts2/{id}", method=RequestMethod.GET)
    @ResponseBody
    public String contacts2Wparameters(@RequestParam(value="id", required=true) Long id, @RequestHeader(value="Authorization", required=true) String token) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
      return contactRepository2.findById(id).toString();
    }
    
    @RequestMapping(value="/contacts2/{id}", method=RequestMethod.POST)
    @ResponseBody
    public String updateContacts2Wparameters(@RequestParam(value="id", required=true) Long id, @RequestHeader(value="Authorization", required=true) String token,
    		@RequestParam(value="timestamp", required=false) Long timestamp,
    		@RequestParam(value="method", required=false) String method,
    		@RequestParam(value="category", required=false) String category,
    		@RequestParam(value="requestForAnonimity", required=false) String requestForAnonimity) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
    	Contact2 contact =contactRepository2.findById(id);
    if(timestamp!=null) {
    		contact.timestamp=timestamp;
    		contactRepository2.save(contact);
    }
    if(method!=null) {
		contact.method=method;
		contactRepository2.save(contact);
    }
    if(category!=null) {
		contact.category=category;
		contactRepository2.save(contact);
    }
    if(category!=null) {
		contact.requestForAnonimity=requestForAnonimity;
		contactRepository2.save(contact);
    }
      return "{\"success\":200}";
    }
    
    //contact3
    
    @RequestMapping(value="/contacts3", method=RequestMethod.POST)
    @ResponseBody
    public String contacts3Post(@RequestHeader(value="Authorization", required=true) String token,
    		@RequestParam(value="timestamp", required=true) Long timestamp,
    		@RequestParam(value="method", required=true) String method,
    		@RequestParam(value="category", required=true) String category,
    		@RequestParam(value="requestForAnonimity", required=true) String requestForAnonimity,
    		@RequestParam(value="id", required=true) Long id) {
    		if (loged.isLoggedToken(token)==false) {
    			return "{\"success\":401}";
    		}
    		contactRepository3.save(new Contact3(id,timestamp,method,category, requestForAnonimity));
      return "{\"success\":200}";
    }
    
    @RequestMapping(value="/contacts3", method=RequestMethod.GET)
    @ResponseBody
    public String contacts3Get(@RequestHeader(value="Authorization", required=true) String token) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
    	List<Contact3> contacts=contactRepository3.findAll();
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
    
    @RequestMapping(value="/contacts3/{id}", method=RequestMethod.GET)
    @ResponseBody
    public String contacts3Wparameters(@RequestParam(value="id", required=true) Long id, @RequestHeader(value="Authorization", required=true) String token) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
      return contactRepository3.findById(id).toString();
    }
    
    @RequestMapping(value="/contacts3/{id}", method=RequestMethod.POST)
    @ResponseBody
    public String updateContacts3Wparameters(@RequestParam(value="id", required=true) Long id, @RequestHeader(value="Authorization", required=true) String token,
    		@RequestParam(value="timestamp", required=false) Long timestamp,
    		@RequestParam(value="method", required=false) String method,
    		@RequestParam(value="category", required=false) String category,
    		@RequestParam(value="requestForAnonimity", required=false) String requestForAnonimity) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
    	Contact3 contact =contactRepository3.findById(id);
    if(timestamp!=null) {
    		contact.timestamp=timestamp;
    		contactRepository3.save(contact);
    }
    if(method!=null) {
		contact.method=method;
		contactRepository3.save(contact);
    }
    if(category!=null) {
		contact.category=category;
		contactRepository3.save(contact);
    }
    if(category!=null) {
		contact.requestForAnonimity=requestForAnonimity;
		contactRepository3.save(contact);
    }
      return "{\"success\":200}";
    }
    
    //contact4
    
    @RequestMapping(value="/contacts4", method=RequestMethod.POST)
    @ResponseBody
    public String contacts4Post(@RequestHeader(value="Authorization", required=true) String token,
    		@RequestParam(value="timestamp", required=true) Long timestamp,
    		@RequestParam(value="method", required=true) String method,
    		@RequestParam(value="category", required=true) String category,
    		@RequestParam(value="requestForAnonimity", required=true) String requestForAnonimity,
    		@RequestParam(value="id", required=true) Long id) {
    		if (loged.isLoggedToken(token)==false) {
    			return "{\"success\":401}";
    		}

    		contactRepository4.save(new Contact4(id,timestamp,method,category, requestForAnonimity));
      return "{\"success\":200}";
    }
    
    @RequestMapping(value="/contacts4", method=RequestMethod.GET)
    @ResponseBody
    public String contacts4Get(@RequestHeader(value="Authorization", required=true) String token) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
    	List<Contact4> contacts=contactRepository4.findAll();
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
    
    @RequestMapping(value="/contacts4/{id}", method=RequestMethod.GET)
    @ResponseBody
    public String contacts4Wparameters(@RequestParam(value="id", required=true) Long id, @RequestHeader(value="Authorization", required=true) String token) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
      return contactRepository4.findById(id).toString();
    }
    
    @RequestMapping(value="/contacts4/{id}", method=RequestMethod.POST)
    @ResponseBody
    public String updateContacts4Wparameters(@RequestParam(value="id", required=true) Long id, @RequestHeader(value="Authorization", required=true) String token,
    		@RequestParam(value="timestamp", required=false) Long timestamp,
    		@RequestParam(value="method", required=false) String method,
    		@RequestParam(value="category", required=false) String category,
    		@RequestParam(value="requestForAnonimity", required=false) String requestForAnonimity) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
    	Contact4 contact =contactRepository4.findById(id);
    if(timestamp!=null) {
    		contact.timestamp=timestamp;
    		contactRepository4.save(contact);
    }
    if(method!=null) {
		contact.method=method;
		contactRepository4.save(contact);
    }
    if(category!=null) {
		contact.category=category;
		contactRepository4.save(contact);
    }
    if(category!=null) {
		contact.requestForAnonimity=requestForAnonimity;
		contactRepository4.save(contact);
    }
      return "{\"success\":200}";
    }
    

}
