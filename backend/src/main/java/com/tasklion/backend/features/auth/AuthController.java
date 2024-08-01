package com.tasklion.backend.features.auth;

import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.model.KeyValueModel;
import com.tasklion.backend.common.model.api.SuccessResponseModel;
import com.tasklion.backend.features.auth.model.AuthResponseModel;
import com.tasklion.backend.features.auth.model.LoginRequestModel;
import com.tasklion.backend.features.auth.service.AuthService;
import com.tasklion.backend.security.token.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}" + ApiEndpoint.AUTH)
public class AuthController {

    private final AuthService authService;
    private final TokenService tokenService;

    @PostMapping(ApiEndpoint.LOGIN)
    public ResponseEntity<SuccessResponseModel<AuthResponseModel>> login(
            @RequestBody LoginRequestModel loginRequestModel) {
        log.info("POST [{}] - login({})", ApiEndpoint.LOGIN, loginRequestModel);
        SuccessResponseModel<AuthResponseModel> response = SuccessResponseModel.<AuthResponseModel>builder()
                .data(authService.login(loginRequestModel))
                .build();
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    @PostMapping(ApiEndpoint.SWITCH_ROLE)
    public ResponseEntity<SuccessResponseModel<AuthResponseModel>> switchRole(
            HttpServletRequest request, @RequestBody KeyValueModel<String> keyValueModel) {
        log.info("POST [{}] - switchRole() - authorization:{}, keyValueModel: {} ", ApiEndpoint.SWITCH_ROLE,
                request.getHeader(HttpHeaders.AUTHORIZATION), keyValueModel);
        return ResponseEntity.ok(SuccessResponseModel.<AuthResponseModel>builder()
                .data(authService.switchRole(keyValueModel))
                .build());
    }

    @PostMapping(ApiEndpoint.REFRESH_TOKEN)
    public ResponseEntity<SuccessResponseModel<AuthResponseModel>> refreshToken(HttpServletRequest request) {
        log.info("POST [{}] - refreshToken({})", ApiEndpoint.REFRESH_TOKEN, request.getHeader(HttpHeaders.AUTHORIZATION));
        return ResponseEntity.ok(SuccessResponseModel.<AuthResponseModel>builder()
                .data(authService.refreshToken(request))
                .build());
    }

    @GetMapping(ApiEndpoint.VERIFY_TOKEN)
    public ResponseEntity<SuccessResponseModel<Boolean>> verifyToken(HttpServletRequest request) {
        log.info("GET [{}] - verifyToken({})", ApiEndpoint.VERIFY_TOKEN, request.getHeader(HttpHeaders.AUTHORIZATION));
        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring(7);
        return ResponseEntity.ok(SuccessResponseModel.<Boolean>builder()
                .data(tokenService.isTokenValid(token))
                .build());
    }
}
