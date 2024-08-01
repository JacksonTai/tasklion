package com.tasklion.backend.features.auth.service;


import com.tasklion.backend.common.constant.ApiMessage;
import com.tasklion.backend.common.model.KeyValueModel;
import com.tasklion.backend.features.auth.model.AuthResponseModel;
import com.tasklion.backend.features.auth.model.LoginRequestModel;
import com.tasklion.backend.features.tasklionAccount.TasklionAccount;
import com.tasklion.backend.features.tasklionAccount.TasklionAccountRepo;
import com.tasklion.backend.features.tasklionAccount.role.Role;
import com.tasklion.backend.features.tasklionAccount.role.RoleRepo;
import com.tasklion.backend.security.RoleBasedAuthenticationToken;
import com.tasklion.backend.security.jwt.service.JwtService;
import com.tasklion.backend.security.token.TokenRepo;
import com.tasklion.backend.security.token.service.TokenService;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenService tokenService;
    private final TokenRepo tokenRepo;

    private final TasklionAccountRepo tasklionAccountRepo;
    private final RoleRepo roleRepo;

    @Override
    @SneakyThrows
    public AuthResponseModel switchRole(KeyValueModel<String> keyValueModel) {
        Role currentRole = roleRepo.findByName(keyValueModel.getValue())
                .orElseThrow(() -> new RoleNotFoundException("Role not found: " + keyValueModel.getValue()));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        TasklionAccount tasklionAccount = tasklionAccountRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(ApiMessage.INVALID_EMAIL_PASSWORD.getMessage()));
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("currentRole", currentRole.getName());
        return generateAndSaveTokens(tasklionAccount, claims);
    }

    @Override
    @SneakyThrows
    public AuthResponseModel login(LoginRequestModel loginRequestModel) {
        String currentRole = loginRequestModel.getCurrentRole().trim().toUpperCase();
        String email = loginRequestModel.getEmail().trim().toLowerCase();
        String password = loginRequestModel.getPassword().trim();
        authenticationManager.authenticate(new RoleBasedAuthenticationToken(
                email, password, currentRole));

        TasklionAccount tasklionAccount = tasklionAccountRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(ApiMessage.INVALID_EMAIL_PASSWORD.getMessage()));
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("currentRole", currentRole);
        return generateAndSaveTokens(tasklionAccount, claims);
    }

    @SneakyThrows
    @Override
    public AuthResponseModel refreshToken(HttpServletRequest request) {

        final String TOKE_PREFIX = "Bearer ";
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String expiredAccessToken = request.getHeader("Expired-Access-Token");

        if (authHeader != null && authHeader.startsWith(TOKE_PREFIX) && expiredAccessToken != null) {
            String refreshToken = authHeader.substring(TOKE_PREFIX.length());
            String username = jwtService.extractUsername(refreshToken);
            String currentRole = jwtService.extractCurrentRole(refreshToken);

            TasklionAccount tasklionAccount = tasklionAccountRepo.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException(ApiMessage.INVALID_EMAIL_PASSWORD.getMessage()));
            Map<String, Object> claims = new HashMap<>();
            claims.put("currentRole", currentRole);

            if (!tokenService.isTokenValid(refreshToken)) {
                tokenService.revokeUserTokens(tasklionAccount);
                throw new MalformedJwtException(ApiMessage.INVALID_TOKEN.getMessage());
            }

            if (jwtService.isTokenValid(refreshToken, tasklionAccount)) {
                String newAccessToken = jwtService.generateJwt(tasklionAccount, claims);
                tokenRepo.findByToken(expiredAccessToken)
                        .ifPresent(token -> {
                            token.setExpired(true);
                            tokenRepo.save(token);
                        });
                tokenService.saveToken(newAccessToken, tasklionAccount);
                return new AuthResponseModel(newAccessToken, refreshToken);
            }
        }
        throw new MalformedJwtException(ApiMessage.INVALID_TOKEN.getMessage());
    }

    private AuthResponseModel generateAndSaveTokens(TasklionAccount account, HashMap<String, Object> claims) {
        String accessToken = jwtService.generateJwt(account, claims);
        String refreshToken = jwtService.generateRefreshToken(account, claims);
        tokenService.revokeUserTokens(account);
        tokenService.saveToken(accessToken, account);
        tokenService.saveToken(refreshToken, account);

        return new AuthResponseModel(accessToken, refreshToken);
    }
}
