package com.tasklion.backend.features.taskerService;

import com.tasklion.backend.features.taskerService.serviceCategory.ServiceCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Optional;

public interface TaskerServiceRepo extends JpaRepository<TaskerService, Long>,
        QuerydslPredicateExecutor<TaskerService> {

    Page<TaskerService> findTaskerServicesByTaskerTasklionAccountUsername(String username, Pageable pageable);

    Optional<TaskerService>  findByTaskerTasklionAccountUsernameAndCategory(String username, ServiceCategory serviceCategory);

}
