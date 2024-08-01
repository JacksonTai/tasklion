package com.tasklion.backend.security.service;

import com.tasklion.backend.security.token.Token;
import com.tasklion.backend.security.token.TokenRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LogoutService implements LogoutHandler {

    private final TokenRepo tokenRepo;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String accessTokenHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshTokenHeader = request.getHeader("Refresh-Token");
        final String TOKEN_PREFIX = "Bearer ";

        if (accessTokenHeader != null && accessTokenHeader.startsWith(TOKEN_PREFIX)) {
            final String accessToken = accessTokenHeader.substring(TOKEN_PREFIX.length());
            revokeToken(accessToken);
        }

        if (refreshTokenHeader != null && refreshTokenHeader.startsWith(TOKEN_PREFIX)) {
            final String refreshToken = refreshTokenHeader.substring(TOKEN_PREFIX.length());
            revokeToken(refreshToken);
        }
    }

    private void revokeToken(String token) {
        Token storedToken = tokenRepo.findByToken(token).orElse(null);
        if (storedToken != null) {
            storedToken.setExpired(true);
            storedToken.setRevoked(true);
            tokenRepo.save(storedToken);
        }
    }

}
