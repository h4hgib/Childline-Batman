package hello;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepository extends MongoRepository<Contact, String> {

    public Contact findById(String id);

//	public void set(String string, Long timestamp);

}