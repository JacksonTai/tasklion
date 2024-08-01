package com.tasklion.backend.features.taskerAvailability.taskerRecurringAvailability;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface TaskerRecurringAvailabilityRepo extends JpaRepository<TaskerRecurringAvailability, Long>,
        QuerydslPredicateExecutor<TaskerRecurringAvailability> {

}
