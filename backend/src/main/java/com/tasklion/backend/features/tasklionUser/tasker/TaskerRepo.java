package com.tasklion.backend.features.tasklionUser.tasker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Optional;

public interface TaskerRepo extends JpaRepository<Tasker, Long>,
        QuerydslPredicateExecutor<Tasker> {

    Optional<Tasker> findByTasklionAccountUsername(String username);

}
