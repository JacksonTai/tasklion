package com.tasklion.backend.service.impl;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.tasklion.backend.constant.TasklionUserRole;
import com.tasklion.backend.domain.entity.TasklionUser;
import com.tasklion.backend.domain.repository.TasklionUserRepo;
import com.tasklion.backend.model.AuthResponseModel;
import com.tasklion.backend.model.LoginRequestModel;
import com.tasklion.backend.model.RegisterRequestModel;
import com.tasklion.backend.service.AuthService;
import com.tasklion.backend.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        String username = jwtService.extractUsername(refreshToken);
        TasklionUser tasklionUser = tasklionUserRepo.findByUsername(username).orElseThrow();
        if (jwtService.isTokenValid(refreshToken, tasklionUser)) {
            String accessToken = jwtService.generateToken(tasklionUser);
            new ObjectMapper().writeValue(response.getOutputStream(), new AuthResponseModel(accessToken, refreshToken));
        }
    }
}
