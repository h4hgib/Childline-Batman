package hello;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepository2 extends MongoRepository<Contact2, String> {

    public Contact2 findById(Long id);

}