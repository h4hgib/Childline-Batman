package hello;

import org.springframework.data.annotation.Id;

public class Contact1 {
	
	@Id
	public String mongo_id;

    public Long id;

    public String diverseCategory;
    public String details;
    public String followup;
    public String followupDetails;

    public Contact1() {}
    //category,details,followup, followupDetails

    public Contact1(Long id,String diverseCategory, String details, String followup, String followupDetails) {
        this.diverseCategory = diverseCategory;
        this.details = details;
        this.followup = followup;
        this.followupDetails = followupDetails;
    }

    @Override
    public String toString() {
        return String.format(
                "Contact{id=%s, diverseCategory='%s', details='%s', followup='%s', followupDetails='%s'}",
                id, diverseCategory, details,followup, followupDetails);
    }

}
