package hello;

import org.springframework.data.annotation.Id;


public class Customer {

    @Id
    public String id;

    public String username;
    public String password;

    public Customer() {}

    public Customer(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Override
    public String toString() {
        return String.format(
                "Customer[id=%s, firstName='%s', lastName='%s']",
                id, username, password);
    }

}
