package hello;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepository3 extends MongoRepository<Contact3, String> {

    public Contact3 findById(Long id);

}