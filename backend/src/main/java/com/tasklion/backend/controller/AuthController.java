package com.tasklion.backend.controller;

import com.tasklion.backend.constant.ApiMessage;
import com.tasklion.backend.model.ApiResponseModel;
import com.tasklion.backend.model.AuthResponseModel;
import com.tasklion.backend.model.LoginRequestModel;
import com.tasklion.backend.model.RegisterRequestModel;
import com.tasklion.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponseModel<AuthResponseModel>> register(@RequestBody RegisterRequestModel registerRequestModel) {
        ApiResponseModel<AuthResponseModel> response = ApiResponseModel.<AuthResponseModel>builder()
                .httpStatus(HttpStatus.CREATED.value())
                .status(HttpStatus.CREATED.getReasonPhrase())
                .message(ApiMessage.REGISTER_SUCCESS.getMessage())
                .internalCode(ApiMessage.REGISTER_SUCCESS.getKey())
                .data(authService.register(registerRequestModel))
                .build();
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseModel<AuthResponseModel>> login(@RequestBody LoginRequestModel loginRequestModel) {
        ApiResponseModel<AuthResponseModel> response = ApiResponseModel.<AuthResponseModel>builder()
                .httpStatus(HttpStatus.OK.value())
                .status(HttpStatus.OK.getReasonPhrase())
                .message(ApiMessage.LOGIN_SUCCESS.getMessage())
                .internalCode(ApiMessage.LOGIN_SUCCESS.getKey())
                .data(authService.login(loginRequestModel))
                .build();
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

}
