package com.tasklion.backend.controller;

import com.tasklion.backend.model.AuthResponseModel;
import com.tasklion.backend.model.LoginRequestModel;
import com.tasklion.backend.model.RegisterRequestModel;
import com.tasklion.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
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
        return new ResponseEntity<>(authService.register(registerRequestModel), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseModel> login(@RequestBody LoginRequestModel loginRequestModel) {
        try {
            authService.login(loginRequestModel);
        } catch (BadCredentialsException e) {
            System.out.println("Exception: " + e);
        }
        return new ResponseEntity<>(authService.login(loginRequestModel), HttpStatus.OK);
    }

}
