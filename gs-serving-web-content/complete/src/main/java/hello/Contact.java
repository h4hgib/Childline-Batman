package hello;

import org.json.JSONObject;
import org.springframework.data.annotation.Id;

public class Contact {
	
	@Id
	public String mongo_id;

    public Long id;

    public Long timestamp;
    public String method;
    public String category;
    public String requestForAnonimity;

    public Contact() {}

    public Contact(Long id,Long timestamp, String method, String category, String requestForAnonimity) {
    		this.id = id;
        this.timestamp = timestamp;
        this.method = method;
        this.category = category;
        this.requestForAnonimity = requestForAnonimity;
    }

    @Override
    public String toString() {
        return String.format(
                "Contact{id=%s, timestamp='%s', method='%s', category='%s', requestForAnonimity='%s'}",
                id, timestamp, method,category, requestForAnonimity);
    }

    public JSONObject toJson() {
    	JSONObject lala = new JSONObject();
    	lala.append("id", this.id);
    	lala.append("timestamp", this.timestamp);
    	lala.append("method", this.method);
    	lala.append("requestForAnonimity", this.requestForAnonimity);
		return lala;
    	
    }
}
