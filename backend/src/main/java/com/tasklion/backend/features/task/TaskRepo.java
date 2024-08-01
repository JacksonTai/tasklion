package com.tasklion.backend.features.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long>,
        QuerydslPredicateExecutor<Task> {

    boolean existsByTaskerServiceIdAndStatusNotIn(Long takerServiceId, List<String> status);

}
