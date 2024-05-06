package com.tasklion.backend.controller;

import com.tasklion.backend.constant.ApiMessage;
import com.tasklion.backend.model.*;
import com.tasklion.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register/customer")
    public ResponseEntity<ApiResponseModel<AuthResponseModel>> register(@RequestBody CustomerModel customerModel) {
        log.info("[/register/customer]: {}", customerModel);
        ApiResponseModel<AuthResponseModel> response = ApiResponseModel.<AuthResponseModel>builder()
                .data(authService.registerCustomer(customerModel))
                .httpStatus(HttpStatus.CREATED.value())
                .status(HttpStatus.CREATED.getReasonPhrase())
                .message(ApiMessage.REGISTER_SUCCESS.getMessage())
                .internalCode(ApiMessage.REGISTER_SUCCESS.getKey())
                .build();
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    @PostMapping("/register/tasker")
    public ResponseEntity<ApiResponseModel<AuthResponseModel>> register(@RequestBody TaskerModel taskerModel) {
        log.info("[/register/tasker]: {}", taskerModel);
        ApiResponseModel<AuthResponseModel> response = ApiResponseModel.<AuthResponseModel>builder()
                .data(authService.registerTasker(taskerModel))
                .httpStatus(HttpStatus.CREATED.value())
                .status(HttpStatus.CREATED.getReasonPhrase())
                .message(ApiMessage.REGISTER_SUCCESS.getMessage())
                .internalCode(ApiMessage.REGISTER_SUCCESS.getKey())
                .build();
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseModel<AuthResponseModel>> login(@RequestBody LoginRequestModel loginRequestModel) {
        log.info("[/login]: {}", loginRequestModel.getEmail());
        ApiResponseModel<AuthResponseModel> response = ApiResponseModel.<AuthResponseModel>builder()
                .data(authService.login(loginRequestModel))
                .httpStatus(HttpStatus.OK.value())
                .status(HttpStatus.OK.getReasonPhrase())
                .message(ApiMessage.LOGIN_SUCCESS.getMessage())
                .internalCode(ApiMessage.LOGIN_SUCCESS.getKey())
                .build();
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponseModel<AuthResponseModel>> refreshToken(HttpServletRequest request) {
        log.info("[/refresh-token]: {}", request.getHeader(HttpHeaders.AUTHORIZATION));
        return ResponseEntity.ok(ApiResponseModel.<AuthResponseModel>builder()
                .httpStatus(HttpStatus.OK.value())
                .status(HttpStatus.OK.getReasonPhrase())
                .message(ApiMessage.REFRESH_TOKEN_SUCCESS.getMessage())
                .internalCode(ApiMessage.REFRESH_TOKEN_SUCCESS.getKey())
                .data(authService.refreshToken(request))
                .build());
    }
}
