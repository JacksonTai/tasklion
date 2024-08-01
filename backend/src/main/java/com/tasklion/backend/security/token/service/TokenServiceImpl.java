package com.tasklion.backend.security.token.service;

import com.tasklion.backend.features.tasklionAccount.TasklionAccount;
import com.tasklion.backend.security.token.Token;
import com.tasklion.backend.security.token.TokenRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TokenServiceImpl implements TokenService {

    private final TokenRepo tokenRepo;

    @Override
    public void saveToken(String token, TasklionAccount tasklionAccount) {
        if (tokenRepo.findByToken(token).isEmpty()) {
            tokenRepo.save(Token.builder()
                    .expired(false)
                    .revoked(false)
                    .token(token)
                    .tokenType("Bearer")
                    .tasklionAccount(tasklionAccount)
                    .build());
        }
    }

    @Override
    public void revokeUserTokens(TasklionAccount tasklionAccount) {
        List<Token> validUserTokens = tokenRepo.findAllValidTokensByTasklionAccountId(tasklionAccount.getId());
        validUserTokens.forEach(token -> {
            token.setRevoked(true);
        });
        tokenRepo.saveAll(validUserTokens);
    }

    @Override
    public void revokeUserToken(String token) {
        tokenRepo.findByToken(token)
                .ifPresent(t -> {
                    t.setRevoked(true);
                    tokenRepo.save(t);
                });
    }

    @Override
    public boolean isTokenValid(String token) {
        return tokenRepo.findByToken(token)
                .map(t -> !t.isExpired() && !t.isRevoked())
                .orElse(false);
    }

}
