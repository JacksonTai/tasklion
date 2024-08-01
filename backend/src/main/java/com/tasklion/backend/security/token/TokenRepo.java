package com.tasklion.backend.security.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepo extends JpaRepository<Token, Integer> {

    @Query("SELECT t FROM TOKEN t WHERE t.tasklionAccount.id = :tasklionAccountId AND t.expired = false AND t.revoked = false")
    List<Token> findAllValidTokensByTasklionAccountId(String tasklionAccountId);

    Optional<Token> findByToken(String token);

}
