package com.tasklion.backend.domain.repository;

import com.tasklion.backend.domain.entity.TasklionUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TasklionUserRepo extends JpaRepository<TasklionUser, String> {

    Optional<TasklionUser> findByUsername(String username);
    Optional<TasklionUser> findByEmail(String email);

}
