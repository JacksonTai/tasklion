package com.tasklion.backend.security.token.service;

import com.tasklion.backend.features.tasklionAccount.TasklionAccount;

public interface TokenService {

    void saveToken(String token, TasklionAccount tasklionAccount);

    void revokeUserTokens(TasklionAccount tasklionAccount);

    void revokeUserToken(String token);

    boolean isTokenValid(String token);

}
