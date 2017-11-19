package hello;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepository4 extends MongoRepository<Contact4, String> {

    public Contact4 findById(Long id);

}