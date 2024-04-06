package com.tasklion.backend.controller;

import com.tasklion.backend.model.AuthResponseModel;
import com.tasklion.backend.model.LoginRequestModel;
import com.tasklion.backend.model.RegisterRequestModel;
import com.tasklion.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseModel> register(@RequestBody RegisterRequestModel registerRequestModel) {
        return ResponseEntity.ok(authService.register(registerRequestModel));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseModel> login(@RequestBody LoginRequestModel loginRequestModel) {
        return ResponseEntity.ok(authService.login(loginRequestModel));
    }

}
