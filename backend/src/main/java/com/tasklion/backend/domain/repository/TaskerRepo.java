package com.tasklion.backend.domain.repository;

import com.tasklion.backend.domain.entity.Tasker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaskerRepo extends JpaRepository<Tasker, Long> {

    Optional<Tasker> findByUsername(String username);

}
