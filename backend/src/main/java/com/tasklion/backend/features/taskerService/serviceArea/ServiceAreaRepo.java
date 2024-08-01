package com.tasklion.backend.features.taskerService.serviceArea;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface ServiceAreaRepo extends JpaRepository<ServiceArea, Long>,
        QuerydslPredicateExecutor<ServiceArea> {

    Page<ServiceArea> findByTaskerTasklionAccountUsername(String username, Pageable pageable);

    List<ServiceArea> findByTaskerTasklionAccountUsername(String username);
}
