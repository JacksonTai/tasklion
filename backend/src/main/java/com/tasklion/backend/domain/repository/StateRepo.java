package com.tasklion.backend.domain.repository;

import com.tasklion.backend.domain.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StateRepo extends JpaRepository<State, Long> {
}
