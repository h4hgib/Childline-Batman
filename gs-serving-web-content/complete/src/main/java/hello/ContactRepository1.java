package hello;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepository1 extends MongoRepository<Contact1, String> {

    public Contact1 findById(Long id);

}