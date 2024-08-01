package com.tasklion.backend.features.tasklionUser.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer, Long>,
        QuerydslPredicateExecutor<Customer> {

    Optional<Customer> findByTasklionAccountUsername(String username);

}
