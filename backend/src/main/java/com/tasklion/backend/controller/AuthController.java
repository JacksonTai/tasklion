package com.tasklion.backend.controller;

import com.tasklion.backend.constant.ApiMessage;
import com.tasklion.backend.model.ApiResponseModel;
import com.tasklion.backend.model.AuthResponseModel;
import com.tasklion.backend.model.LoginRequestModel;
import com.tasklion.backend.model.RegisterRequestModel;
import com.tasklion.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
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

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponseModel<AuthResponseModel>> register(@RequestBody RegisterRequestModel registerRequestModel) {
        logger.info("[/register]: {}", registerRequestModel);
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
        logger.info("[/login]: {}", loginRequestModel.getEmail());
        ApiResponseModel<AuthResponseModel> response = ApiResponseModel.<AuthResponseModel>builder()
                .httpStatus(HttpStatus.OK.value())
                .status(HttpStatus.OK.getReasonPhrase())
                .message(ApiMessage.LOGIN_SUCCESS.getMessage())
                .internalCode(ApiMessage.LOGIN_SUCCESS.getKey())
                .data(authService.login(loginRequestModel))
                .build();
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    @PostMapping("/refresh-token")
    public  ResponseEntity<ApiResponseModel<AuthResponseModel>> refreshToken(HttpServletRequest request) {
        logger.info("[/refresh-token]: {}", request.getHeader(HttpHeaders.AUTHORIZATION));
        return ResponseEntity.ok(ApiResponseModel.<AuthResponseModel>builder()
                .httpStatus(HttpStatus.OK.value())
                .status(HttpStatus.OK.getReasonPhrase())
                .message(ApiMessage.REFRESH_TOKEN_SUCCESS.getMessage())
                .internalCode(ApiMessage.REFRESH_TOKEN_SUCCESS.getKey())
                .data(authService.refreshToken(request))
                .build());
    }
}
