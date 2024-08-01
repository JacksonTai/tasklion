package com.tasklion.backend.features.makerChecker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface MakerCheckerRepo extends JpaRepository<MakerChecker, Long>,
        QuerydslPredicateExecutor<MakerChecker> {
}
