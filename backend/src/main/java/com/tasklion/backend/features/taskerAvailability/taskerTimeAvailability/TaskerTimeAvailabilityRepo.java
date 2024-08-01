package com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface TaskerTimeAvailabilityRepo extends JpaRepository<TaskerTimeAvailability, Long>,
        QuerydslPredicateExecutor<TaskerTimeAvailability> {


}
