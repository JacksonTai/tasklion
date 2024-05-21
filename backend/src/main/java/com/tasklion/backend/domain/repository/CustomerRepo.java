package com.tasklion.backend.domain.repository;

import com.tasklion.backend.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer, Long> {

    Optional<Customer> findByUsername(String username);

}
