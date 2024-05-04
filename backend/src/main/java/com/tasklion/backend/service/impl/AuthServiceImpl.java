package com.tasklion.backend.service.impl;


import com.tasklion.backend.constant.ApiMessage;
import com.tasklion.backend.constant.TasklionUserRole;
import com.tasklion.backend.domain.entity.TasklionUser;
import com.tasklion.backend.domain.repository.TasklionUserRepo;
import com.tasklion.backend.model.AuthResponseModel;
import com.tasklion.backend.model.LoginRequestModel;
import com.tasklion.backend.model.RegisterRequestModel;
import com.tasklion.backend.service.AuthService;
import com.tasklion.backend.service.JwtService;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final TasklionUserRepo tasklionUserRepo;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponseModel register(RegisterRequestModel registerRequestModel) {
        TasklionUser tasklionUser = TasklionUser.builder()
                .username(registerRequestModel.getUsername())
                .email(registerRequestModel.getEmail())
                .password(passwordEncoder.encode(registerRequestModel.getPassword()))
                .role(TasklionUserRole.CUSTOMER.getDisplayName().toUpperCase())
                .build();
        TasklionUser savedTasklionUser = tasklionUserRepo.save(tasklionUser);
        return new AuthResponseModel(jwtService.generateToken(savedTasklionUser),
                jwtService.generateRefreshToken(savedTasklionUser));
    }

    @Override
    public AuthResponseModel login(LoginRequestModel loginRequestModel) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestModel.getEmail(),
                loginRequestModel.getPassword()));
        TasklionUser tasklionUser = tasklionUserRepo.findByEmail(loginRequestModel.getEmail()).orElseThrow();
        return new AuthResponseModel(jwtService.generateToken(tasklionUser),
                jwtService.generateRefreshToken(tasklionUser));
    }

    @SneakyThrows
    @Override
    public AuthResponseModel refreshToken(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String TOKE_PREFIX = "Bearer ";
        if (authHeader != null && authHeader.startsWith(TOKE_PREFIX)) {
            refreshToken = authHeader.substring(TOKE_PREFIX.length());
            String username = jwtService.extractUsername(refreshToken);
            TasklionUser tasklionUser = tasklionUserRepo.findByUsername(username).orElseThrow();
            if (jwtService.isTokenValid(refreshToken, tasklionUser)) {
                String newAccessToken = jwtService.generateToken(tasklionUser);
                return new AuthResponseModel(newAccessToken, refreshToken);
            }
        }
        throw new MalformedJwtException(ApiMessage.INVALID_TOKEN.getMessage());
    }
}
