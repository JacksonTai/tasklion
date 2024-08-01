package com.tasklion.backend.features.taskerAvailability;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface TaskerAvailabilityRepo extends JpaRepository<TaskerAvailability, Long>,
        QuerydslPredicateExecutor<TaskerAvailability> {

}
