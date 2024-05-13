package com.tasklion.backend.service.impl;


import com.tasklion.backend.constant.ApiMessage;
import com.tasklion.backend.constant.TasklionUserRole;
import com.tasklion.backend.domain.entity.*;
import com.tasklion.backend.domain.repository.RoleRepo;
import com.tasklion.backend.domain.repository.TasklionUserRepo;
import com.tasklion.backend.mapper.CustomerMapper;
import com.tasklion.backend.mapper.TaskerMapper;
import com.tasklion.backend.model.AuthResponseModel;
import com.tasklion.backend.model.CustomerModel;
import com.tasklion.backend.model.LoginRequestModel;
import com.tasklion.backend.model.TaskerModel;
import com.tasklion.backend.service.AuthService;
import com.tasklion.backend.service.JwtService;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TasklionUserRepo tasklionUserRepo;
    private final RoleRepo roleRepo;
    private final CustomerMapper customerMapper;
    private final TaskerMapper taskerMapper;

    @Override
    public AuthResponseModel registerCustomer(CustomerModel customerModel) {
        Customer customer = customerMapper.toEntity(customerModel);
        return registerTasklionUser(customer, TasklionUserRole.CUSTOMER);
    }

    @Override
    public AuthResponseModel registerTasker(TaskerModel taskerModel) {
        Tasker tasker = taskerMapper.toEntity(taskerModel);
        return registerTasklionUser(tasker, TasklionUserRole.TASKER);
    }

    @SneakyThrows
    private AuthResponseModel registerTasklionUser(TasklionUser tasklionUser, TasklionUserRole tasklionUserRole) {
        Role role = roleRepo.findByName(tasklionUserRole.name())
                .orElseThrow(() -> new RoleNotFoundException("Role not found: " + tasklionUserRole.name()));

        tasklionUser.setPassword(passwordEncoder.encode(tasklionUser.getPassword()));
        tasklionUser.getUserRoles().add(UserRole.builder()
                .role(role)
                .tasklionUser(tasklionUser)
                .build());

//        TasklionUser savedTasklionUser = tasklionUserRepo.save(tasklionUser);
        return new AuthResponseModel(jwtService.generateToken(tasklionUser),
                jwtService.generateRefreshToken(tasklionUser));
    }

    @Override
    public AuthResponseModel login(LoginRequestModel loginRequestModel) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestModel.getEmail(),
                loginRequestModel.getPassword()));
        TasklionUser tasklionUser = tasklionUserRepo.findByEmail(loginRequestModel.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException(ApiMessage.INVALID_EMAIL_PASSWORD.getMessage()));
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
            TasklionUser tasklionUser = tasklionUserRepo.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException(ApiMessage.INVALID_EMAIL_PASSWORD.getMessage()));
            if (jwtService.isTokenValid(refreshToken, tasklionUser)) {
                String newAccessToken = jwtService.generateToken(tasklionUser);
                return new AuthResponseModel(newAccessToken, refreshToken);
            }
        }
        throw new MalformedJwtException(ApiMessage.INVALID_TOKEN.getMessage());
    }
}
