package com.openclassrooms.mddapi.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.openclassrooms.mddapi.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findByEmail(String email);

}
