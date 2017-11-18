package hello;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GreetingController {
	
	private Logged loged=new Logged();
	
  
    @RequestMapping(value="/auth/login", method=RequestMethod.POST)
    @ResponseBody
    public String login(@RequestParam(value="username", required=true) String username,@RequestParam(value="password", required=true) String password, Model model) {
    		String token=loged.logIn(username, password);
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
    public String contactsPost(@RequestHeader(value="token", required=true) String token) {
    		if (loged.isLoggedToken(token)==false) {
    			return "{\"success\":401}";
    		}
      return "{\"success\":200}";
    }
    
    @RequestMapping(value="/contacts", method=RequestMethod.GET)
    @ResponseBody
    public String contactsGet(@RequestHeader(value="token", required=true) String token) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
      return "[" + 
      		"{" + 
      		"id: 1," + 
      		"timestamp: 1511013857," + 
      		"method: ‘phone’," + 
      		"category: ‘information’" + 
      		"requestForAnonymity: ‘YES’," + 
      		"sex: ‘M’," + 
      		"age: 12," + 
      		"primaryReason: ‘Neglect’," + 
      		"secondaryReason: []" + 
      		"}," + 
      		"{" + 
      		"id: 2," + 
      		"timestamp: 1511013857," + 
      		"method: ‘chat’," + 
      		"category: ‘diverse’" + 
      		"requestForAnonymity: ‘NO’," + 
      		"option: ‘Silent call’" + 
      		"}," + 
      		"{" + 
      		"id: 3," + 
      		"timestamp: 1511013857," + 
      		"method: ‘email’," + 
      		"category: ‘referral’" + 
      		"requestForAnonymity: ‘?’," + 
      		"sex: ‘F’," + 
      		"age: 15," + 
      		"primaryReason: ‘Bullying’," + 
      		"secondaryReason: [‘Suicide’, ‘Teen Pregnancy’]" + 
      		"}" + 
      		"]";
    }
    
    @RequestMapping(value="/contacts/{id}", method=RequestMethod.GET)
    @ResponseBody
    public String contactsWparameters(@RequestParam(value="id", required=true) String id, @RequestHeader(value="token", required=true) String token) {
    	if (loged.isLoggedToken(token)==false) {
			return "{\"success\":401}";
		}
      return "{" + 
      		"id: 1," + 
      		"timestamp: 1511013857," + 
      		"method: ‘phone’," + 
      		"category: ‘information’" + 
      		"requestForAnonymity: ‘YES’" + 
      		"}";
    }

}
