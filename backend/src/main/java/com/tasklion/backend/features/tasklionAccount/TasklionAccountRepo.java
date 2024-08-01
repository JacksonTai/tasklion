package com.tasklion.backend.features.tasklionAccount;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TasklionAccountRepo extends JpaRepository<TasklionAccount, String> {

    Optional<TasklionAccount> findByUsername(String username);

    Optional<TasklionAccount> findByEmail(String email);

    boolean existsByUsernameIgnoreCase(String username);

    boolean existsByEmailIgnoreCase(String email);
}
